import React, { useEffect, useRef, useState } from "react";
import generateLogo from "../utils/generateLogo";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/useAuthContext";

const Header = ({ setNotes }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const debounceTimeoutRef = useRef(null);
  const { userName } = useAuthContext();

  const handleSearch = () => {
    clearTimeout(debounceTimeoutRef.current);

    debounceTimeoutRef.current = setTimeout(async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/notes/searchNotes/${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      } else {
        console.error("Search failed:", response.statusText);
      }
    }, 300);
  };

  useEffect(() => {
    handleSearch();
    return () => clearTimeout(debounceTimeoutRef.current);
  }, [searchTerm]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-6/12 bg-white px-3 py-2 mx-auto rounded-lg drop-shadow translate-y-3 flex items-center justify-between z-10">
      <h4 className="font-bold text-blue-700 text-xl">Notes</h4>
      <div className="flex items-center justify-end relative">
        <input
          type="text"
          className="bg-gray-200 rounded-md px-3 py-1 pr-7"
          placeholder="Search for your notes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IoSearchOutline className="float-right absolute mr-1 font-bold text-xl text-blue-500" />
      </div>
      <div
        className="flex items-center justify-center gap-3 relative z-10"
        onMouseEnter={() => setShowDropDown(true)}
        onMouseLeave={() => setShowDropDown(false)}
      >
        <div className="w-12 h-12 p-2 flex items-center justify-center font-bold text-lg rounded-full bg-blue-400 text-white cursor-pointer hover:bg-blue-500">
          {userName ? generateLogo(userName) : " "}
        </div>
        {showDropDown && (
          <div className="absolute bg-white top-full p-3 rounded-lg drop-shadow-lg z-10">
            <ul>
              <li className="px-3 py-1 cursor-pointer hover:bg-gray-100 rounded-md">
                Setting
              </li>
              <li
                className="px-3 py-1 cursor-pointer hover:bg-gray-100 rounded-md"
                onClick={handleSignOut}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
