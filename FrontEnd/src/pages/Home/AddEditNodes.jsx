import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../util/axiosInstance";

function AddEditNodes({
  noteData,
  type,
  onClose,
  getAllNotes,
  showToastMessage,
}) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // add new node
  const addNewNote = async () => {
    try {
      const responce = await axiosInstance.post("/add-notes", {
        title,
        content,
        tags,
      });
      if (responce.data && responce.data.note) {
        showToastMessage("Node Added Successfully!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.responce &&
        error.responce.data &&
        error.responce.data.message
      ) {
        setError(error.responce.data.message);
      }
    }
  };

  // edit node
  const editNote = async () => {
    try {
      const nodeId = noteData._id;
      const responce = await axiosInstance.post("/edit-note/" + nodeId, {
        title,
        content,
        tags,
      });
      if (responce.data && responce.data.note) {
        showToastMessage("Node Updated Successfully!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.responce &&
        error.responce.data &&
        error.responce.data.message
      ) {
        setError(error.responce.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please Enter a Title");
      return;
    }
    if (!content) {
      setError("Pleace Enter a Content");
      return;
    }
    setError("");
    if (type == "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="text-slate-400 absolute right-0 top-0 text-2xl"
        onClick={() => {
          onClose();
        }}
      >
        <MdClose className="" />
      </button>

      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="title" className="input-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="content" className="input-label">
          Content
        </label>
        <textarea
          name=""
          id="content"
          className="text-sm text-sl  bg-slate-50 outline-none rounded"
          rows={10}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-600 text-sm pt-4">{error}</p>}
      <button
        className="btn-primary mt-5 p-3 font-medium"
        onClick={() => {
          handleAddNote();
        }}
      >
        {type == "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
}

export default AddEditNodes;
