import "./header.css";
import logo from "../../assets/logo.png";
import logo_m from "../../assets/logo-mobile.png";
import useWindowSize from "../../hooks/useWindowSize";
import { Link } from "react-router-dom";
const Header = () => {
  const { width } = useWindowSize();
  const isMobile = width < 900;
  const menuRoutes = [
    { link: "/houses", title: "HOUSES" },
    { link: "/books", title: "BOOKS" },
    { link: "/characters", title: "CHARACTERS" },
  ];
  return (
    <header>
      <div
        className="logo"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        {isMobile ? (
          <img src={logo_m} alt="logo" />
        ) : (
          <img src={logo} alt="logo" />
        )}
        <div>Ice and Fire</div>
      </div>
      <div className="routes">
        {menuRoutes.map((i, k) => (
          <Link key={k} to={i.link}>
            <div className="route">{i.title}</div>
          </Link>
        ))}
      </div>
    </header>
  );
};
export default Header;
