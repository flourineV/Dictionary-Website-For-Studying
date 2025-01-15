import Navbar from "../components/Navbar";
import Calendar from "../../components/Calendar";
import LeaderBoard from "../../components/LeaderBoard";
function NavbarOnly({ children }) {
  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default NavbarOnly;
