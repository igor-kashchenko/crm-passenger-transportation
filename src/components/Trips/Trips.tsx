import React, { useState, useEffect } from "react";
import { TripFormData } from "../../types/AppTypes";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Button, Container, Table, Toast } from "react-bootstrap";

export const Trips: React.FC = () => {
  const [trips, setTrips] = useState<TripFormData[]>([]);
  const [showToast, setShowToast] = useState(false);

  const tripsRef = collection(db, "trips");

  useEffect(() => {
    const unsubscribe = onSnapshot(tripsRef, (snapshot) => {
      const tripsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as TripFormData),
      }));
      setTrips(tripsData);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id?: string) => {
    if (id) {
      try {
        await deleteDoc(doc(tripsRef, id));

        setShowToast(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-center mb-0">Trips</h1>

      <Container
        className="mt-2 overflow-auto h-50"
        style={{ maxHeight: "400px" }}
      >
        <Table striped bordered hover className="mb-0">
          <thead>
            <tr>
              <th>Car Number</th>
              <th>From</th>
              <th>To</th>
              <th>Driver</th>
              <th>Manager</th>
              <th>Passangers Quantity</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.carNumber}</td>
                <td>{trip.from}</td>
                <td>{trip.to}</td>
                <td>{trip.driver}</td>
                <td>{trip.manager}</td>
                <td>{trip.passengers}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(trip.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Toast
          className="position-absolute bottom-0 start-50 translate-middle-x text-white"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>

          <Toast.Body>Trip deleted successfully!</Toast.Body>
        </Toast>
      </Container>
    </>
  );
};
