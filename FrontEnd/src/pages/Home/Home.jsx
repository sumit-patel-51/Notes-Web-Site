import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { IoMdAdd } from "react-icons/io";
import AddEditNodes from "./AddEditNodes";
import Model from "react-modal";

function Home() {
  const [openAddEtitNodes, setOpenAddEtitNodes] = useState({
    isShow: false,
    type: "ADD",
    data: null,
  });
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <NoteCard
            title={"Meeting on 7th April"}
            content={"Meeting on 7th April Meeting on 7th April"}
            date={"7-4-2025"}
            tags={"#Meeting"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
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
        />
      </Model>
    </>
  );
}

export default Home;
