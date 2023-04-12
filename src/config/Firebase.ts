import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK_3LYMzbmLHzVAYhoiGlx6520k7tFELc",
  authDomain: "crm-project-ddb08.firebaseapp.com",
  projectId: "crm-project-ddb08",
  storageBucket: "crm-project-ddb08.appspot.com",
  messagingSenderId: "1061483286277",
  appId: "1:1061483286277:web:fbc44593100d6596c1b16c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

