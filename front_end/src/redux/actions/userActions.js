export const loginUser = (user, token) => ({
  type: "LOGIN",
  payload: user,
  token: token,
});

export const logoutUser = () => ({
  type: "LOGOUT",
});
