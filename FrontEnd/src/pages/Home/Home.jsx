import React from "react";
import Navbar from "../../components/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { IoMdAdd } from "react-icons/io";
import AddEditNodes from "./AddEditNodes";

function Home() {
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
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {}}>
        <IoMdAdd className="text-[32px] text-white"/> 
      </button>

      <AddEditNodes />
    </>
  );
}

export default Home;
