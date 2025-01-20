const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Khôi phục người dùng từ localStorage nếu có
  token: localStorage.getItem("token") || null,
  userId: JSON.parse(localStorage.getItem("user"))?._id || null, // Lấy userId từ user nếu có
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // Khi login, cập nhật user, token và userId vào state và localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", action.token);
      localStorage.removeItem("userId");
      return {
        ...state,
        user: action.payload,
        token: action.token,
        userId: action.payload._id,
      };

    case "LOGOUT":
      // Khi logout, xóa thông tin người dùng và token khỏi state và localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return {
        ...state,
        user: null,
        token: null,
        userId: null,
      };

    default:
      return state;
  }
};
