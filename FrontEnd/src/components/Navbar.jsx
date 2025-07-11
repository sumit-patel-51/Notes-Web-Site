import React, { useState } from "react";
import ProfileInfo from "./Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";

function Navbar({ userInfo, onSearchNote }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const OnLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h1 className="text-xl font-medium text-black py-2">Notes</h1>
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo={userInfo} OnLogout={OnLogout} />
    </div>
  );
}

export default Navbar;
