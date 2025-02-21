import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "../../config";
import Home from "../Home/Home";

const RedirectHome = () => {
  const token = useSelector((state) => state.user?.token);

  if (token) {
    console.log("🔒 Người dùng đã đăng nhập, điều hướng về Dashboard");
    return <Navigate to={config.routes.dashboard} replace />;
  }

  console.log("🏠 Hiển thị trang Home vì chưa đăng nhập");
  return <Home />;
};

export default RedirectHome;
