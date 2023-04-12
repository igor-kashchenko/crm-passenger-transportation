import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/auth";
import { auth, db } from "../../config/Firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { AuthContextValue, UserData } from "../../types/AppTypes";

export const AuthContext = React.createContext<AuthContextValue>({
  user: null,
  isLoading: false,
  userData: null,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const usersRef = collection(db, "users");
  const usersRefCache = useRef(usersRef);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const userRef = doc(usersRefCache.current, user.uid);

      const fetchUserData = async () => {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        }
      };

      fetchUserData();
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
