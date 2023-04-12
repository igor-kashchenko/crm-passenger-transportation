import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import busLogo from "../../assets/bus-logo.svg";
import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { auth } from "../../config/Firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../AuthContext";
import userCircleLogo from "../../assets/user-circle-logo.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { user, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const isUserAdmin = userData?.userType === "admin";

  const handleLogOut = async () => {
    try {
      await signOut(auth);

      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Navbar className="justify-content-between align-items-center bg-light py-2 border-bottom px-2">
      <Container className="px-0 m-0">
        <Link
          to="/home"
          className="text-decoration-none d-flex justify-content-start align-items-center "
        >
          <img src={busLogo} alt="bus logo" />

          <span className="ms-1 mb-0 text-uppercase text-dark ">Company</span>
        </Link>
      </Container>

      <Container className="d-flex align-items-center justify-content-end px-0 pe-2 m-0">
        <span
          className={`${
            isUserAdmin ? "bg-primary" : "bg-warning"
          } px-2 rounded-5 me-2`}
        >
          {userData?.userType}
        </span>

        <div
          className="rounded-circle overflow-hidden me-2"
          style={{ width: "30px", height: "30px" }}
        >
          <img
            src={user?.photoURL ? user.photoURL : userCircleLogo}
            alt="user circle logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <NavDropdown title={userData?.name} align="end">
          <NavDropdown.Item onClick={() => navigate("/profile")}>
            MyProfile
          </NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
