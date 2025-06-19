import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordInput({ values, placeholder, onChange }) {
  const [isShowPAssword, setIsShowPAssword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPAssword(!isShowPAssword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3">
      <input
        type={isShowPAssword ? "text" : "password"}
        value={values}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isShowPAssword ? (
        <FaRegEye
          size={22}
          className="text-blue-700 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slat-400 cursor-pointer"
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
}

export default PasswordInput;
