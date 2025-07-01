import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const AddNewTag = () => {
    if (inputValue.trim !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
    else {
        null
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      AddNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <span className="flex items-center bg-slate-200 p-1 rounded text-sm gap-1"  key={index}>
              #{tag}
              <button className="" onClick={() => {handleRemoveTag(tag)}}>
                <MdClose className="" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center mt-3 gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          className="text-sm rounded bg-transparent border px-3 py-2"
          onKeyDown={handleKeyDown}
          placeholder="Add Tags"
          required

        />
        <button
          className="w-8 h-8 items-center flex justify-center border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            AddNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
