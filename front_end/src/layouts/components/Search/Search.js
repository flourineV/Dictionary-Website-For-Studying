import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ word, setWord, handleSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center">
      <div className="flex w-full items-center bg-white rounded-full shadow-lg px-6 py-2">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search English"
          className="flex-grow bg-transparent border-none outline-none text-lg"
        />
        <button
          type="button"
          onClick={() => setWord("")}
          className="text-gray-600 px-4"
        >
          <span>&#10005;</span>
        </button>
      </div>
      <button
        type="submit"
        className="bg-yellow-400 text-white px-4 py-4 rounded-full ml-4 w-12 h-12 flex justify-center items-center transition-all duration-300 hover:bg-yellow-500 active:bg-yellow-600"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "black" }} />
      </button>
    </form>
  );
}

export default SearchBar;
