const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {}, // Thay vì null, dùng object rỗng
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_REQUEST":
    case "SIGN_UP_REQUEST":
      return { ...state, loading: true, error: null };

    case "SIGN_IN_SUCCESS":
    case "SIGN_UP_SUCCESS":
      const userData = {
        user: action.payload.user, // 🟢 Đưa user vào cấp dưới
        token: action.payload.token, // 🟢 Đưa token vào cùng cấp với user
      };

      // Lưu user và token vào localStorage với format phân cấp
      localStorage.setItem("user", JSON.stringify(userData));

      return {
        ...state,
        user: userData, // 🟢 Giữ cấu trúc phân cấp
      };

    case "SIGN_IN_FAIL":
    case "SIGN_UP_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "SIGN_OUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        user: {
          user: null,
        }, // Chỉ lưu user, không bọc thêm userInfo
      };

    default:
      return state;
  }
};

export default userReducer;
