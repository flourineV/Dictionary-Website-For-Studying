import { SignIn, SignUp } from "../../utils/userRequest";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const signInUser = (userData) => async (dispatch) => {
  dispatch({ type: SIGN_IN_REQUEST });
  try {
    const data = await SignIn(userData);

    dispatch({ type: SIGN_IN_SUCCESS, payload: data });

    // Lưu user vào localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));

    return data;
  } catch (error) {
    dispatch({ type: SIGN_IN_FAILURE, payload: error.message });
    throw error;
  }
};

export const signUpUser = (userData) => async (dispatch) => {
  dispatch({ type: SIGN_UP_REQUEST });
  try {
    const data = await SignUp(userData);

    dispatch({ type: SIGN_UP_SUCCESS, payload: data });

    // Tùy chọn: Đăng nhập ngay sau khi đăng ký
    const loggedInUser = await SignIn({
      email: userData.email,
      password: userData.password,
    });

    dispatch({ type: SIGN_IN_SUCCESS, payload: loggedInUser });

    // Lưu vào localStorage
    localStorage.setItem("userInfo", JSON.stringify(loggedInUser));

    return loggedInUser;
  } catch (error) {
    dispatch({ type: SIGN_UP_FAILURE, payload: error.message });
    throw error;
  }
};

export const signOutUser = () => (dispatch) => {
  dispatch({ type: "SIGN_OUT" });
};
