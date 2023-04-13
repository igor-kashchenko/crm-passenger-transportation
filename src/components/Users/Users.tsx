import React, { useState, useContext, useEffect } from "react";
import { Container, Table, Toast } from "react-bootstrap";
import { AuthContext } from "../AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { Roles, User } from "../../types/AppTypes";
import { ADMINS_ID } from "../../utils/utils";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { user } = useContext(AuthContext);

  const usersRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs
          .map((doc) => ({ ...(doc.data() as User) }))
          .filter(
            (dbUser) => dbUser.userId !== user?.uid && !ADMINS_ID.includes(dbUser.userId)
          );

        setUsers(usersData);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateRole = async (userId: string, newRole: Roles) => {
    const userRef = doc(usersRef, userId);

    try {
      await updateDoc(userRef, { role: newRole });

      setUsers(
        users.map((dbUser) => (dbUser.userId === userId
          ? { ...dbUser, role: newRole }
          : dbUser))
      );

      setToastMessage("User role updated successfully!");
      setShowToast(true);
    } catch (error) {
      console.error("Error updating user role:", error);

      setToastMessage("An error occurred while updating user role.");
      setShowToast(true);
    }
  };

  return (
    <Container className="bg-light py-3 border">
      <h1 className="text-center mb-2">Users</h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isUserPassenger = user.role === "passenger";
            const isUserManager = user.role === "manager";
            const isUserDriver = user.role === "driver";

            return (
              <tr key={user.userId}>
                <td>{user.name}</td>
                <td>{user.email || user.phoneNumber}</td>
                <td className="d-flex justify-content-start align-items-center">
                  <Container className="d-flex justify-content-start align-items-center ">
                    <p className="mb-0 me-3">Select role for user</p>

                    <select
                      value={user.role}
                      onChange={(event) =>
                        handleUpdateRole(
                          user.userId,
                          event.target.value as Roles
                        )
                      }
                    >
                      <option value="passenger">Passenger</option>
                      <option value="driver">Driver</option>
                      <option value="manager">Manager</option>
                    </select>
                  </Container>

                  <span
                    className={`
                      ${isUserPassenger
                        ? "bg-success text-white"
                        : ""}
                      ${isUserManager
                        ? "bg-info text-dark"
                        : ""}
                      ${isUserDriver
                        ? "bg-danger text-white"
                        : ""}
                        
                      px-2 rounded-5 me-2`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

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

        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};
