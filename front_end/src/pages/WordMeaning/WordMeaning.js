import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from "../../layouts/components/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { addFlashcard } from "../../utils/flashcardApi";
import { useSelector } from "react-redux";

const WordMeaning = ({ wordData, error }) => {
  const { word } = useParams(); // Lấy từ khóa từ URL
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState(word); // Trạng thái tìm kiếm
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Trạng thái đăng nhập
  const user = useSelector((state) => state.user.user || null);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  useEffect(() => {
    setSearchWord(word); // Cập nhật trạng thái searchWord khi URL thay đổi
  }, [word]); // Chạy lại khi từ khóa trong URL thay đổi

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!wordData) {
    return <p>Loading...</p>;
  }

  const handleSearch = () => {
    if (searchWord.trim()) {
      navigate(`/word-meaning/${searchWord}`); // Cập nhật URL với từ khóa tìm kiếm
    }
  };

  const handleAddFlashcard = async (word, meaning) => {
    if (!isLoggedIn) return;
    try {
      await addFlashcard(user._id, word, meaning); // Gọi API thêm flashcard
      alert(`Added "${word}" to your flashcards!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add flashcard. Please try again.");
    }
  };

  const getAudioType = (url) => {
    if (url.includes("us")) {
      return "US";
    } else if (url.includes("uk")) {
      return "UK";
    } else if (url.includes("au")) {
      return "AU";
    }
    return "";
  };

  // Hàm điều hướng tới trang của từ đồng nghĩa / trái nghĩa
  const handleWordClick = (word) => {
    navigate(`/word-meaning/${word}`);
  };

  // Hàm cập nhật từ khóa cho thanh SearchBar
  const handleSearchChange = (newWord) => {
    setSearchWord(newWord);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-azure rounded">
      {/* Từ cần tra */}
      <div>
        <SearchBar
          word={searchWord}
          setWord={setSearchWord}
          handleSearch={handleSearch}
        />
      </div>
      <h3 className="font-thin mt-12">
        Meaning of <span className="font-semibold">'{wordData.word}'</span> in
        English
      </h3>
      <h1 className="text-4xl font-bold text-blue-600 mt-3">{wordData.word}</h1>

      {/* Phần phonetics */}
      {wordData.phonetics && wordData.phonetics.length > 0 && (
        <div className="mt-4">
          {wordData.phonetics.map((phonetic, index) => {
            const audioType = phonetic.audio
              ? getAudioType(phonetic.audio)
              : "";

            return (
              <div key={index} className="flex items-center space-x-4">
                {phonetic.audio && (
                  <>
                    <span className=" text-black font-bold">{audioType}</span>
                    <button
                      onClick={() => new Audio(phonetic.audio).play()}
                      className="bg-transparent text-white py-1 rounded hover:none"
                    >
                      <FontAwesomeIcon
                        icon={faVolumeHigh}
                        style={{ color: "black" }}
                      />
                    </button>
                  </>
                )}
                <p className="text-lg">{phonetic.text}</p>
              </div>
            );
          })}
        </div>
      )}
      <hr className="border-t-2 border-black my-2 " />
      {/* Các phần nghĩa */}
      {wordData.meanings && wordData.meanings.length > 0 && (
        <div>
          {wordData.meanings.map((meaning, index) => (
            <div key={index}>
              {/* Từ loại */}
              <h3 className="text-lg font-bold text-gray-800">
                {meaning.partOfSpeech}
              </h3>
              <hr className="border-t border-gray-400 my-2" />

              {/* Định nghĩa */}
              {meaning.definitions && (
                <div className="mt-4 space-y-6">
                  {meaning.definitions.map((definition, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <button
                        className={`border-black min-w-5 border-2 font-bold text-lg w-5 h-5 flex items-center justify-center rounded ${
                          isLoggedIn
                            ? "bg-yellow-500 text-black hover:opacity-70"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!isLoggedIn}
                        onClick={() =>
                          handleAddFlashcard(
                            wordData.word,
                            definition.definition
                          )
                        }
                      >
                        +
                      </button>

                      <div>
                        <p>{definition.definition}</p>
                        {definition.example && (
                          <p className="italic text-gray-600">
                            Example: "{definition.example}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Từ đồng nghĩa */}
              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div className="mt-2">
                  <strong className="text-1xl">Synonyms:</strong>
                  <div className="text-blue-500 mt-1">
                    {meaning.synonyms.map((synonym, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleWordClick(synonym)} // Điều hướng khi click vào từ đồng nghĩa
                        className="hover:underline mr-2"
                      >
                        {synonym}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Từ trái nghĩa */}
              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <div className="mt-2">
                  <strong>Antonyms:</strong>
                  <div className="text-red-500 mt-1">
                    {meaning.antonyms.map((antonym, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleWordClick(antonym)} // Điều hướng khi click vào từ trái nghĩa
                        className="hover:underline mr-2"
                      >
                        {antonym}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <hr className="border-t-2 border-black my-2 mt-12" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordMeaning;
