import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WordMeaning from "../pages/WordMeaning/WordMeaning"; // import component hiển thị kết quả

const WordInformation = () => {
  const { word } = useParams();
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/word/${word}`
        );
        console.log("API Response:", response);
        setWordData(response.data);
      } catch (err) {
        setError("Error fetching word data");
      }
    };

    if (word) {
      fetchWordData();
    }
  }, [word]);

  return <WordMeaning wordData={wordData} error={error} />;
};

export default WordInformation;
