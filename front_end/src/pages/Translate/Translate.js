import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Content/Footer";

function Translate() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("vi");

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setTranslatedText("Please enter some text to translate");
      return;
    }
    try {
      const response = await fetch("http://localhost:3005/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang: sourceLang,
          targetLang: targetLang,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translatedText);
      } else {
        const errorData = await response.json();
        setTranslatedText(errorData.message || "Translation failed.");
      }
    } catch (error) {
      setTranslatedText("An error occurred during translation.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-8">
      <div className="bg-[#FFD43B] border-[3px] border-[#191229] rounded-2xl p-8 w-full max-w-4xl shadow-[0_10px_20px_rgba(0,0,0,0.3)] border-b-[10px]">
        <h1 className="text-4xl font-TranslateFont font-bold text-blue-950 text-center mb-8">
          Flourine Translate
          <FontAwesomeIcon icon={faLanguage} className="ml-6" />
        </h1>
        <div className="flex flex-col gap-6">
          {/* Input Text Area */}
          {/* Language Selection */}
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                From
              </label>
              <select
                className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#302d45]"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>

            <button
              onClick={() => {
                const temp = sourceLang;
                setSourceLang(targetLang);
                setTargetLang(temp);
              }}
              className=" mt-7 bg-[#191229] text-white p-4 rounded-full shadow-lg hover:bg-[#302d45] hover:scale-105 transition transform"
            >
              <FontAwesomeIcon icon={faRepeat} />
            </button>

            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-2">
                To
              </label>
              <select
                className="w-full p-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#302d45]"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="vi">Vietnamese</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
          <textarea
            className="w-full p-5 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#302d45]"
            rows={5}
            placeholder="Enter text to translate..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
          ></textarea>

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            className="w-full bg-[#191229] text-white py-3 rounded-xl shadow-lg hover:bg-[#302d45] hover:shadow-xl transition text-xl font-semibold"
          >
            Translate
          </button>

          {/* Translated Text Output */}
          <div className="mt-1">
            <div className="min-h-[150px] w-full p-4 bg-white border-2 rounded-xl text-gray-800 shadow-inner">
              {translatedText || "Your translated text will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Translate;
