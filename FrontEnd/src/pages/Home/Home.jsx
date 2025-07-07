import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { IoMdAdd } from "react-icons/io";
import moment from "moment";
import AddEditNodes from "./AddEditNodes";
import Model from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import addNoteImg from "../../assets/noteadd.svg";

function Home() {
  const [openAddEtitNodes, setOpenAddEtitNodes] = useState({
    isShow: false,
    type: "ADD",
    data: null,
  });
  const [showToast, setShowToast] = useState({
    isShow: false,
    message: "",
    type: "ADD",
  });
  const [allNodes, setAllNodes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [onSearch, setOnSearch] = useState(false);

  const showToastMessage = (message, type) => {
    setShowToast({
      isShow: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToast({
      isShow: false,
      message: "",
    });
  };

  // get user
  const getUserInfo = async () => {
    try {
      const responce = await axiosInstance.get("/get-user");
      if (responce.data && responce.data.user) {
        setUserInfo(responce.data.user);
      }
    } catch (error) {
      if (error.responce.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {
    try {
      const responce = await axiosInstance.get("/get-all-notes");

      if (responce.data && responce.data.notes) {
        setAllNodes(responce.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again");
    }
  };

  //delete note
  const deleteNote = async (data) => {
    try {
      const noteId = data._id;
      const responce = await axiosInstance.delete("/delete-note/" + noteId);
      if (responce.data && !responce.data.error) {
        showToastMessage("Note Deleted Successfully!", "DELETE");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.responce &&
        error.responce.data &&
        error.responce.data.message
      ) {
        setError(error.responce.data.message);
      } else {
        console.log("An unexpected error occurred. Please try again");
      }
    }
  };

  //isPinned note
  // const isPinnedNote = async (data) => {
  //   try {
  //     const noteId = data._id;
  //     const pinned = data.isPinned;
  //     if (pinned === true) {
  //       pinned = false;
  //     } else {
  //       pinned = true;
  //     }
  //     const responce = await axiosInstance.update(
  //       "/update-note-pinned/" + noteId,
  //       {
  //         pinned,
  //       }
  //     );
  //     if (responce.data && !responce.data.error) {
  //       showToastMessage("Note Pinned Successfully!");
  //       getAllNotes();
  //     }
  //   } catch (error) {
  //     if (
  //       error.responce &&
  //       error.responce.data &&
  //       error.responce.data.message
  //     ) {
  //       setError(error.responce.data.message);
  //     } else {
  //       console.log("An unexpected error occurred. Please try again");
  //     }
  //   }
  // };

  const onSearchNote = async (query) => {
    try {
      const responce = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (responce.data && responce.data.notes) {
        setOnSearch(true);
        setAllNodes(responce.data.notes);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();
    return () => {};
  }, []);

  //edit hadler
  const handleEdit = (noteDetails) => {
    setOpenAddEtitNodes({ isShow: true, type: "edit", data: noteDetails });
  };

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote = {onSearchNote} />
      <div className="container mx-auto">
        {allNodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {allNodes.map((item, index) => (
              <NoteCard
                title={item.title}
                id={item._id}
                content={item.content}
                date={moment(item.createdAt).format("DD MMM YYYY")}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => {
                  handleEdit(item);
                }}
                onDelete={() => {
                  deleteNote(item);
                }}
                onPinNote={() => {
                  isPinnedNote(item);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imageUrl={addNoteImg}
            message={
              "Start create your first note! Click the 'ADD' button to jot down your thoughts, ideas and reminders. Let's get started"
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEtitNodes({ isShow: true, type: "ADD", data: null });
        }}
      >
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <Model
        isOpen={openAddEtitNodes.isShow}
        ariaHideApp={false}
        onRequistClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="md:w-[40%] w-[95%] max-h-3/4 bg-white mx-auto mt-14 p-5 overflow-auto rounded-md"
      >
        <AddEditNodes
          noteData={openAddEtitNodes.data}
          type={openAddEtitNodes.type}
          onClose={() => {
            setOpenAddEtitNodes({ isShow: false, type: "ADD", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Model>
      <Toast
        isShow={showToast.isShow}
        message={showToast.message}
        type={showToast.type}
        onClose={handleCloseToast}
      />
    </>
  );
}

export default Home;
