import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Toast, Row, Col } from "react-bootstrap";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { AuthContext } from "../AuthContext";
import { TripFormData, User } from "../../types/AppTypes";

export const CreateTrip: React.FC = () => {
  const [formData, setFormData] = useState<TripFormData>({
    carNumber: "",
    from: "",
    to: "",
    driver: "",
    manager: "",
    passengers: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [showToast, setShowToast] = useState(false);

  const { user } = useContext(AuthContext);

  const usersRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs
          .map((doc) => ({ ...(doc.data() as User) }))
          .filter((dbUser) => dbUser.userId !== user?.uid);

        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const tripsRef = collection(db, "trips");
      await addDoc(tripsRef, { ...formData });

      setFormData({
        carNumber: "",
        from: "",
        to: "",
        driver: "",
        manager: "",
        passengers: 0,
      });

      setShowToast(true);
    } catch (error) {
      console.error("Error creating trip:", error);
      setShowToast(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center mb-2">Create Trip</h1>
      <Row className="d-flex justify-content-center">
        <Col xl={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCarNumber" className="mb-2">
              <Form.Control
                placeholder="Enter Car Number"
                type="text"
                pattern="[A-Za-z]{2}[0-9]{4}[A-Za-z]{2}"
                title="XX1111XX"
                value={formData.carNumber}
                required
                onChange={(event) =>
                  setFormData({ ...formData, carNumber: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formFrom" className="mb-2">
              <Form.Control
                placeholder="Enter starting point"
                type="text"
                pattern="^[A-Za-z ]+$"
                title="Only letters"
                value={formData.from}
                required
                onChange={(event) =>
                  setFormData({ ...formData, from: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formTo" className="mb-2">
              <Form.Control
                placeholder="Enter ending point"
                type="text"
                value={formData.to}
                pattern="^[A-Za-z ]+$"
                required
                onChange={(event) =>
                  setFormData({ ...formData, to: event.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDriver" className="mb-2">
              <Form.Control
                placeholder="Choose the Driver"
                as="select"
                value={formData.driver}
                onChange={(event) =>
                  setFormData({ ...formData, driver: event.target.value })
                }
              >
                <option value="">Select a driver</option>
                {users
                  .filter((user) => user.role === "driver")
                  .map((user) => (
                    <option key={user.userId} value={user.name}>
                      {user.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formManager" className="mb-2">
              <Form.Control
                placeholder="Choose the Manager"
                as="select"
                value={formData.manager}
                onChange={(event) =>
                  setFormData({ ...formData, manager: event.target.value })
                }
              >
                <option value="">Select a manager</option>
                {users
                  .filter((user) => user.role === "manager")
                  .map((user) => (
                    <option key={user.userId} value={user.name}>
                      {user.name}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPassengers" className="mb-2">
              <Form.Control
                placeholder="Enter passengers quantity"
                type="number"
                value={formData.passengers}
                required
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    passengers: parseInt(event.target.value),
                  })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Toast
        className="position-absolute bottom-0 start-50 translate-middle-x text-white"
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg="success"
      >
        <Toast.Header>
          <strong className="me-auto">Success</strong>
        </Toast.Header>

        <Toast.Body>Trip created successfully!</Toast.Body>
      </Toast>
    </Container>
  );
};
