import React from "react";
import { IoMdSearch, IoMdClose } from "react-icons/io";

function SearchBar({ value, onChange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      {value && <IoMdClose className="text-slate-300 cursor-pointer hover:text-slate-800 text-lg" onClick={onClearSearch}/>}
      <IoMdSearch className="text-slate-300 cursor-pointer hover:text-slate-800 text-lg" onClick={handleSearch}/>
    </div>
  );
}

export default SearchBar;
