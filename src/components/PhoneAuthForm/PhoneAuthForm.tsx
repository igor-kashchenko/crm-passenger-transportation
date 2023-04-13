import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { auth, db } from "../../config/Firebase";
import { collection } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getErrorMessageFromFirebaseCode } from "../../utils/utils";
import { FirebaseErrorCode } from "../../types/AppTypes";

export const PhoneAuthForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCodeBeingSent, setIsCodeBeingSent] = useState(false);

  const navigate = useNavigate();

  const usersRef = collection(db, "users");

  const handlePhoneSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsCodeBeingSent(true);

    try {
      const verifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
        auth
      );

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        verifier
      );
      setConfirmationResult(confirmation);
    } catch (error: any) {
      const errorCode = error.code as FirebaseErrorCode;
      const errorMessage =
        getErrorMessageFromFirebaseCode(errorCode) || error.message;

      setErrorMessage(errorMessage);
    } finally {
      setIsCodeBeingSent(false);
    }
  };

  const handleVerificationCodeSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      await confirmationResult.confirm(verificationCode);

      const user = auth.currentUser;

      if (user) {
        const userRef = doc(usersRef, user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            userId: user.uid,
            phoneNumber,
            name,
            userType: "user",
            role: "passenger",
          });
        }
      }

      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        getErrorMessageFromFirebaseCode(error.code) || error.message;

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
            onSubmit={handlePhoneSignIn}
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
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                className="mb-2"
                pattern="\+380\d{9}"
                title="+380xxxxxxxxx"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
              Send Verification Code
            </Button>
          </Form>

          {isCodeBeingSent && <p>Sending...</p>}

          {confirmationResult && (
            <Form
              className="col-xl-3 col-md-6 col-sm-6 col-8"
              onSubmit={handleVerificationCodeSubmit}
            >
              <Form.Group controlId="formVerificationCode">
                <Form.Control
                  type="text"
                  placeholder="Enter verification code"
                  className="mb-2"
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Verify
              </Button>
            </Form>
          )}

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          <div id="recaptcha-container"></div>
        </Col>
      </Row>
    </Container>
  );
};
