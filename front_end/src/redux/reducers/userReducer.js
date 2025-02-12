const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {}, // Thay vì null, dùng object rỗng
  token: localStorage.getItem("token") || null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_REQUEST":
    case "SIGN_UP_REQUEST":
      return { ...state, loading: true, error: null };

    case "SIGN_IN_SUCCESS":
    case "SIGN_UP_SUCCESS":
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: { ...action.payload.user }, // Chỉ lưu user, không bọc thêm userInfo
        token: action.payload.token,
      };

    case "SIGN_IN_FAIL":
    case "SIGN_UP_FAIL":
      return { ...state };

    case "SIGN_OUT":
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      return {
        ...state,
        user: null, // Chỉ lưu user, không bọc thêm userInfo
        token: null,
      };

    default:
      return state;
  }
};

export default userReducer;
