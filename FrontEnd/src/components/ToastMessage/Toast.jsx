import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

function Toast({ isShow, message, type, onClose }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);
  return (
    <div
      className={`absolute right-6  top-20 transition-all duration-400 ${
        isShow ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
          type === "DELETE" ? "after:bg-red-500" : "after:bg-green-500"
        } after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              type === "DELETE" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {type === "DELETE" ? (
              <MdDeleteOutline className="text-lg text-red-500" />
            ) : (
              <LuCheck className="text-lg text-green-500" />
            )}
          </div>
          <p className="text-slate-800 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Toast;
