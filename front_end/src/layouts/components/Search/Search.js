import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchSuggestions } from "../../../utils/fetchSuggestion";
import { useLocation } from "react-router-dom";

function SearchBar({ word, setWord, handleSearch }) {
  const [focused, setFocused] = useState(false);
  const [debouncedWord, setDebouncedWord] = useState("");
  const [selectedFromSuggestions, setSelectedFromSuggestions] = useState(false);
  const selectedFromSuggestionsRef = useRef(selectedFromSuggestions);
  const skipNextDebounce = useRef(false);
  const searchRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/word-meaning")) {
      selectedFromSuggestionsRef.current = true; // Chỉ cập nhật ref, không gây re-render
      skipNextDebounce.current = true;
      setSuggestions([]);
      console.log("Fuck");
    }
  }, [location]);

  useEffect(() => {
    selectedFromSuggestionsRef.current = selectedFromSuggestions;
  }, [selectedFromSuggestions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSelectSuggestion = (selectedWord) => {
    console.log("Before set:", selectedFromSuggestionsRef.current);
    console.log("Selected Word:", selectedWord);
    setSelectedFromSuggestions(true);
    selectedFromSuggestionsRef.current = true; // Cập nhật ref ngay lập tức
    skipNextDebounce.current = true; // Bỏ qua cập nhật debouncedWord tiếp theo
    console.log("After set:", selectedFromSuggestionsRef.current);
    setWord(selectedWord);
    setSuggestions([]); // Xóa gợi ý ngay lập tức
  };

  useEffect(() => {
    if (skipNextDebounce.current) {
      skipNextDebounce.current = false; // Reset sau khi bỏ qua
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedWord(word);
    }, 500);

    return () => clearTimeout(timer);
  }, [word]);

  useEffect(() => {
    const getSuggestions = async () => {
      if (!debouncedWord.trim()) return;
      if (selectedFromSuggestionsRef.current) {
        console.log("Skipping fetch due to selectedFromSuggestions");
        return; // Ngăn fetch API khi đã chọn từ
      }
      console.log("Ans:", selectedFromSuggestionsRef.current);
      console.log("Fetching suggestions for:", debouncedWord);

      const data = await fetchSuggestions(debouncedWord);
      setSuggestions(data);
    };

    getSuggestions();
  }, [debouncedWord]);

  useEffect(() => {
    if (selectedFromSuggestionsRef.current) {
      setSuggestions([]);
      handleSearch();
      setSelectedFromSuggestions(false); // Reset sau khi tìm kiếm
      selectedFromSuggestionsRef.current = false; // Cập nhật ref ngay lập tức
    }
  }, [selectedFromSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]); // Ẩn gợi ý khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="w-full flex flex-col items-center relative">
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <div
          className={`relative flex items-center bg-white rounded-full shadow-lg px-6 py-2 transition-all duration-300 border-2 border-black ${
            focused ? "w-[650px]" : "w-[550px]"
          } mx-auto`}
          style={{ transformOrigin: "center" }}
        >
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Search English words"
            className="flex-grow bg-transparent border-none outline-none text-lg"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <button
            type="button"
            onClick={() => setWord("")}
            className="text-gray-600 px-4"
          >
            <span>&#10005;</span>
          </button>
          <button
            type="submit"
            className="absolute -right-14 bg-yellow-400 px-4 py-4 rounded-full w-12 h-12 flex justify-center items-center transition-all duration-300 hover:bg-yellow-600 active:bg-yellow-700 border-2 border-black"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "black" }}
            />
          </button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 w-[650px] bg-white shadow-lg rounded-lg overflow-hidden z-20">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-200 transition-all duration-200"
              onMouseDown={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
