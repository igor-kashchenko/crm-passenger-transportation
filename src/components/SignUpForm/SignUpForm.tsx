import React, { useState } from "react";
import { auth, db } from "../../config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  ADMIN_EMAIL,
  getErrorMessageFromFirebaseCode,
} from "../../utils/utils";
import { FirebaseErrorCode } from "../../types/AppTypes";

export const SignUpForm: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userType = email === ADMIN_EMAIL
        ? "admin"
        : "user";

      const role = userType === "admin"
        ? null
        : "passenger";

      const newUserDocRef = doc(usersRef, user.uid);

      await setDoc(newUserDocRef, {
        email,
        name,
        userId: user.uid,
        userType,
        role,
      });

      navigate("/home");
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorCode;
      const errorMessage =
        getErrorMessageFromFirebaseCode(errorCode) || error.message;

      setErrorMessage(errorMessage);
    }
  };

  return (
    <Container fluid className="d-flex vh-100">
      <Row className="flex-grow-1">
        <Col
          xl={12}
          className="d-flex flex-column justify-content-center align-items-center bg-green"
        >
          <Form
            className="col-xl-3 col-md-6 col-sm-6 col-8"
            onSubmit={handleSignUp}
          >
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                onChange={(event) => setName(event.target.value)}
                value={name}
                placeholder="Name"
                pattern="[A-Za-z\s-]+"
                title="Name should contain only letters"
                required
              />

              {/* {nameError && <p className="text-danger">{nameError}</p>} */}
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Control
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                pattern=".{8,}"
                title="Password should be at least 8 characters long"
                required
              />
            </Form.Group>

            {errorMessage && <p className="text-danger">{errorMessage}</p>}

            <Button variant="primary" type="submit" className="w-100">
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
