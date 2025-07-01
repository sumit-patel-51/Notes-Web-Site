require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");

const User = require("./models/user.model");
const Note = require("./models/note.mode");

const { authenticateToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// BAck-End

// create account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is Required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is Required" });
  }

  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.status(400).json({ error: true, message: "User Already exist" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Succssefully",
  });
});

//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is Required" });
  }

  const userinfo = await User.findOne({ email: email });

  if (!userinfo) {
    return res.status(400).json({ error: true, message: "Not Found" });
  }

  if (userinfo.email == email && userinfo.password == password) {
    const user = { user: userinfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });

    return res.json({
      error: false,
      message: "Login Successfully",
      user,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

//get-user
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!isUser) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: ""
  });
});

//add-note
app.post("/add-notes", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is Required." });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is Required." });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Added Successfully!",
    });
  } catch (error) {
    return res.json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

// edit-nodes
app.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(400).json({ error: true, message: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (isPinned) note.isPinned = isPinned;
    if (tags) note.tags = tags;

    await note.save();

    return res
      .status(200)
      .json({ error: false, note, message: "Note update Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

// get-all-notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All Notes Retrived Successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//delete-note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note Not Found" });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note Deleted Successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

//Update isPinned

app.post("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const nodeId = req.params.noteId;
  const { isPinned } = req.body;

  if (!isPinned) {
    return res
      .status(404)
      .json({ error: true, message: "isPinned is Required" });
  }

  try {
    const note = await Note.findOne({ _id: nodeId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, message: "Note Not Found" });
    }
    note.isPinned = isPinned;
    note.save();

    return res.json({
      error: false,
      note,
      message: "Note Updated Successfully!",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error." });
  }
});

app.listen(8000);

module.exports = app;
