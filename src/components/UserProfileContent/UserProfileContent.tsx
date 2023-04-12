import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import userCircleLogo from "../../assets/user-circle-logo.svg";

export const UserProfileContent: React.FC = () => {
  const { user, userData } = useContext(AuthContext);

  const hasPhoto = user?.photoURL;
  const isUserAdmin = userData?.userType === "admin";
  const isUserPassenger = userData?.role === "passenger";
  const isUserManager = userData?.role === "manager";
  const isUserDriver = userData?.role === "driver";

  return (
    <>
      <Container className="mt-5 px-5 py-4 ">
        <h1 className="mb-4">My Profile</h1>

        <Row className="align-items-center mb-3 border rounded bg-light p-5">
          <Col xs={12} sm={2}>
            <div className="avatar-circle d-flex flex-column align-items-center">
              <img
                src={hasPhoto ? user.photoURL : userCircleLogo}
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100px" }}
              />

              <p
                className={`${
                  isUserAdmin ? "bg-primary" : "bg-warning"
                } mb-0 mt-1 px-2 rounded-5`}
              >
                {userData?.userType}
              </p>
            </div>
          </Col>

          <Col xs={12} sm={10}>
            <h4>{userData?.name}</h4>

            {userData?.phoneNumber && <h4>{userData?.phoneNumber}</h4>}

            <h4>{userData?.email}</h4>
            <p
              className={`
              ${isUserPassenger ? "bg-success" : ""}
              ${isUserManager ? "bg-info" : ""}
              ${isUserDriver ? "bg-danger" : ""}
              px-2 rounded-5 text-white d-inline`}
            >
              {userData?.role}
            </p>
          </Col>
        </Row>

        <Row>
          <Col sm={6} className="px-0 pe-1">
            <Container className="bg-light border p-5 rounded d-flex flex-column justify-content-center align-items-center">
              <h2>Container 1</h2>
              <p>Content goes here.</p>
            </Container>
          </Col>
          <Col sm={6} className="px-0">
            <Container className="bg-light border p-5 rounded d-flex flex-column justify-content-center align-items-center">
              <h2>Container 2</h2>
              <p>Content goes here.</p>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
