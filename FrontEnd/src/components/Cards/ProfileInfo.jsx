import React, { useState } from "react";
import { getIntials } from "../../util/helper";

function ProfileInfo({ OnLogout, userInfo }) {
  return (
    userInfo && (<div className="flex items-center gap-3">
      <div className="w-12 h-12 flex justify-center items-center text-xl rounded-full bg-slate-200 text-slate-950">
        {getIntials(userInfo?.fullName)}
      </div>
      <div>
        <p className="font-medium">{userInfo?.fullName}</p>
        <button
          className="text-slate-600 text-sm underline"
          onClick={OnLogout}
        >
          Logout
        </button>
      </div>
    </div>)
  );
}

export default ProfileInfo;
