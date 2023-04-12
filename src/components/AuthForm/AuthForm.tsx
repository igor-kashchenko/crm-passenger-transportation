import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthForm.css";
import { auth, db } from "../../config/Firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authBackground from "../../assets/auth-background.png";
import googleLogo from "../../assets/Google_Logo.png";
import fbLogo from "../../assets/fb-logo.png";
import phoneIcon from "../../assets/phone-icon.png";
import {
  ADMIN_EMAIL,
  getErrorMessageFromFirebaseCode,
} from "../../utils/utils";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        getErrorMessageFromFirebaseCode(error.code) || error.message;

      setErrorMessage(errorMessage);
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      const userRef = doc(usersRef, user.uid);
      const userSnapshot = await getDoc(userRef);

      const userType = user.email === ADMIN_EMAIL ? "admin" : "user";
      const role = userType === "admin" ? null : "passenger";

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          userType,
          role,
        });
      }

      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        getErrorMessageFromFirebaseCode(error.code) || error.message;

      setErrorMessage(errorMessage);
    }
  };

  const handleSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      const userRef = doc(usersRef, user.uid);
      const userSnapshot = await getDoc(userRef);

      const userType = user.email === ADMIN_EMAIL ? "admin" : "user";
      const role = userType === "admin" ? null : "passenger";

      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          userId: user.uid,
          email: user.email,
          name: user.displayName,
          userType,
          role,
        });
      }

      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        getErrorMessageFromFirebaseCode(error.code) || error.message;

      setErrorMessage(errorMessage);
    }
  };

  const handlePhoneLogInRedirect = () => {
    navigate("phonelogin");
  };

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="flex-grow-1">
        <Col
          md={4}
          className="p-0 d-flex justify-content-center align-items-center"
        >
          <img
            src={authBackground}
            alt="authorization background"
            className="img-fluid"
          />
        </Col>
        <Col
          md={8}
          className="d-flex flex-column justify-content-center align-items-center bg-green"
        >
          <p>Please login to your account</p>

          <Form
            className="col-xl-4 col-md-6 col-sm-6 col-8"
            onSubmit={handleSignIn}
          >
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                pattern=".{8,}"
                title="Password should be at least 8 characters long"
                placeholder="Password"
                required
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            <hr />

            <Button
              onClick={handleSignInWithGoogle}
              variant="light"
              type="submit"
              className="w-100 d-flex light justify-content-center align-items-center border text-dark mb-2 "
            >
              Login with
              <img src={googleLogo} alt="google logo" className="logo-img" />
            </Button>

            <Button
              onClick={handleSignInWithFacebook}
              variant="light"
              type="submit"
              className="w-100 d-flex light justify-content-center align-items-center border text-dark mb-2"
            >
              Login with
              <img src={fbLogo} alt="facebook logo" className="logo-img" />
            </Button>

            <Button
              onClick={handlePhoneLogInRedirect}
              variant="light"
              type="submit"
              className="w-100 d-flex light justify-content-center align-items-center border text-dark"
            >
              Login with
              <img src={phoneIcon} alt="phone logo" className="logo-img" />
            </Button>

            <p className="mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="link-primary text-decoration-none">
                Sign Up
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
