import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all easy-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-xs font-medium">{title}</h6>
          <span className="text-sm text-slate-500">{date}</span>

        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned? "text-blue-600" : "text-slate-300"}`} onClick={onPinNote}/>
      </div>
      <p className="text-slate-600 text-xs mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex items-center gap-2">
            <MdCreate className="icon-btn hover:text-green-600" onClick={onEdit}/>
            <MdDelete className="icon-btn hover:text-red-600" onClick={onDelete}/>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
