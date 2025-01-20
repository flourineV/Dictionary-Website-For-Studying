import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlashcards } from "../../utils/flashcardApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { openModal, closeModal } from "../../redux/reducers/modalSlice"; // Import Redux actions
import Login from "../../layouts/components/SignInModal";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userActions";

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen); // Đọc trạng thái modal từ Redux
  const userId = useSelector((state) => state.user.userId); // Accessing user ID from Redux
  const [userState, setUserState] = useState(null);

  // Hàm xử lý đăng nhập thành công
  const handleLoginSuccess = (userData) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/");
  };

  useEffect(() => {
    // Khôi phục người dùng từ localStorage khi tải lại trang
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserState(user);
    }

    // Fetch flashcards khi người dùng đã đăng nhập
    const fetchFlashcards = async () => {
      if (userId) {
        try {
          const data = await getFlashcards(); // Fetch flashcards for logged-in user
          setFlashcards(data);
        } catch (error) {
          console.error("Không thể lấy danh sách flashcards:", error);
        }
      }
    };

    fetchFlashcards();
  }, [userId]);

  // Xử lý khi người dùng chưa đăng nhập
  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Bạn cần đăng nhập để xem Flashcards!
        </h1>
        <button
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-500"
          onClick={() => dispatch(openModal())}
        >
          Đăng nhập ngay
        </button>
        {isModalOpen && (
          <Login
            closeModal={() => dispatch(closeModal())}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    );
  }

  // Xử lý khi người dùng đã đăng nhập
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Flashcards của tôi
      </h1>
      {flashcards.length === 0 ? (
        <p className="mt-4 text-center">
          Bạn chưa có flashcard nào. Hãy thêm từ mới để học!
        </p>
      ) : (
        <div className="relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {flashcards.map((card) => (
              <SwiperSlide key={card._id}>
                <div className="p-4 border rounded-lg shadow-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                  <h3 className="text-2xl font-bold">{card.word}</h3>
                  <p className="mt-2 text-lg">{card.meaning}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
