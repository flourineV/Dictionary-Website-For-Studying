const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Khôi phục người dùng từ localStorage nếu có
  token: localStorage.getItem("token") || null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        token: action.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};
