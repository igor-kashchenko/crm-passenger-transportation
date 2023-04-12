import firebase from "firebase/auth";

export type UserData = {
  name: string;
  email: string;
  uid: string;
  userType: string;
  role: string;
  phoneNumber?: string;
};

export type AuthContextValue = {
  user: firebase.User | null;
  isLoading: boolean;
  userData: UserData| null;
};

export type Roles = "passenger" | "driver" | "manager";

export type User = {
  userId: string;
  name: string;
  email: string;
  role: Roles;
  phoneNumber?: string;
  userType: string | null;
};

export type TripFormData = {
  carNumber: string;
  from: string;
  to: string;
  driver: string;
  manager: string;
  passengers: number;
  id?: string;
}
