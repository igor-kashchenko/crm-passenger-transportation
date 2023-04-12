import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BurgerMenu.css";
import homeLogo from "../../assets/home-logo.svg";
import userLogo from "../../assets/user-logo.svg";
import cogLogo from "../../assets/cog-logo.svg";
import chatLogo from "../../assets/chat-logo.svg";
import walletLogo from "../../assets/wallet-logo.svg";
import flagLogo from "../../assets/flag-logo.svg";
import supportLogo from "../../assets/support-logo.svg";
import logOutLogo from "../../assets/logOut-logo.svg";
import tripLogo from "../../assets/trip-logo.svg";
import usersLogo from "../../assets/users-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
import { auth } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../AuthContext";

export const BurgerMenu: React.FC = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  const isAdmin = userData?.userType === "admin";

  const menuLinks = [
    { to: "/home", imgSrc: homeLogo, text: "Home" },

    ...(isAdmin
      ? [
          { to: "/users", imgSrc: usersLogo, text: "Users" },
          { to: "/trips", imgSrc: tripLogo, text: "Trips" },
        ]
      : []),

    { to: "/profile", imgSrc: userLogo, text: "Profile" },
    { to: "/messages", imgSrc: chatLogo, text: "Messages" },
    { to: "/payments", imgSrc: walletLogo, text: "Payments and Billing" },
    { to: "/settings", imgSrc: cogLogo, text: "Settings" },
    { to: "/reports", imgSrc: flagLogo, text: "Reports and Analytics" },
    { to: "/support", imgSrc: supportLogo, text: "Help and support" },
  ];

  const handleLogOut = async () => {
    try {
      await signOut(auth);

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Nav className="cont col-md-2 col-12 col-sm-12 d-md-block bg-light sidebar pt-5 px-2">
      {menuLinks.map((link, index) => (
        <Nav.Item key={index} className="border-0 burger-menu-item ">
          <NavLink
            className={({ isActive }) =>
              (isActive ? "is-active" : "") +
              " d-flex border-0 align-items-center burger-menu-link nav-link p-2 mb-2 rounded-2"
            }
            to={link.to}
          >
            <img src={link.imgSrc} alt={`${link.text} logo`} className="me-2" />
            {link.text}
          </NavLink>
        </Nav.Item>
      ))}

      <Button
        variant="white"
        className="d-flex border-0 burger-menu-link w-100 p-2"
        onClick={handleLogOut}
      >
        <img src={logOutLogo} alt="logout logo" className="me-2" />
        Log out
      </Button>
    </Nav>
  );
};
