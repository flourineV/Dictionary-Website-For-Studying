import {
  faMagnifyingGlassChart,
  faPenFancy,
  faBookOpen,
  faClipboardList,
  faLightbulb,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const navigate = useNavigate();
  const items = [
    {
      title: "Accurate Word Information",
      description:
        "Look up word meanings, pronunciations, synonyms, antonyms, and real-life usage examples effortlessly, powered by the FreeDictionaryAPI.",
    },
    {
      title: "Smart Search & Instant Suggestions",
      description:
        "No need to type the exact word! Our optimized search engine with Trie and caching delivers fast and accurate word suggestions.",
    },
    {
      title: "Flashcards & Vocabulary Retention",
      description:
        "Save and review words effectively using our Spaced Repetition System (SRS) to strengthen your vocabulary retention over time.",
    },
    {
      title: "Exercises & AI Writing Evaluation",
      description:
        "Test your knowledge with multiple-choice questions and IELTS Writing exercises. Our AI-powered system evaluates your writing based on Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammar.",
    },
    {
      title: "Word of the Day & Daily Learning",
      description:
        "Expand your vocabulary with a new word every day, complete with explanations, pronunciation, and example sentences to help you use it effectively.",
    },
    {
      title: "Chatbot & Instant Translation",
      description:
        "Need help with English? Our AI chatbot answers your grammar and vocabulary questions, while our quick translation tool ensures you understand words in different contexts.",
    },
  ];

  // Danh sách icon tương ứng với từng mục
  const icons = [
    faMagnifyingGlassChart,
    faPenFancy,
    faBookOpen,
    faClipboardList,
    faLightbulb,
    faComments,
  ];

  return (
    <div>
      <div className="p-8 text-center">
        <motion.h2
          className="text-4xl font-bold mt-6 mb-6"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          🌟 What can you find here? 🌟
        </motion.h2>

        {/* Grid 3 cột 2 hàng */}
        <div className="grid grid-cols-3 gap-10 mt-20">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="p-4  rounded-xl cursor-pointer shadow-lg hover:bg-yellow-200  bg-yellow-100 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 10,
                  duration: 0.3,
                }}
              >
                <FontAwesomeIcon
                  icon={icons[index]}
                  className="text-6xl text-[#191229] mb-4"
                />
              </motion.div>

              <motion.h3
                className="text-xl font-semibold"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 mt-2 text-justify pr-10 pl-10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="relative w-full h-[700px] mt-20 flex items-center">
        {/* Nội dung bên trái */}
        <div className="w-1/3 h-full flex flex-col items-center justify-center text-left  px-6 bg-[#FFD43B]">
          <motion.h2
            className="text-4xl font-bold text-black mb-4 ml-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            🔥 Learning English has never been easier and more engaging!
          </motion.h2>
          <motion.p
            className="text-lg text-gray-700 max-w-2xl ml-8  mt-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Start your journey today with{" "}
            <span className="font-bold">TheFlourine Dictionary</span> and
            improve your English every day! 🚀
          </motion.p>

          <motion.div
            className="flex "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button
              className="mt-10 bg-red-500 text-white px-6 py-3 rounded-full w-36 shadow-lg hover:bg-white hover:text-red-500"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </button>
          </motion.div>
        </div>

        {/* Ảnh nền bên phải với hiệu ứng lượn sóng */}
        <div className="w-2/3 h-full relative overflow-hidden bg-indigo-900">
          <div className="absolute inset-0"></div>
          <img
            src={images.bodyintro}
            className="w-full h-full object-cover opacity-80"
            alt="Background"
          />

          {/* Hiệu ứng sóng */}
          <div className="absolute left-0 top-0 w-40 h-full">
            <svg
              className="absolute top-0 left-[-50px] h-full w-auto text-white"
              viewBox="0 0 150 500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="
        M150,0 
        C130,100 50,150 50,250 
        C50,350 130,400 150,500 
        L0,500 L0,0 Z"
                fill="#FFD43B"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
