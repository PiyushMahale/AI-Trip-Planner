import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "./firebase";

export const auth = getAuth(app);

// SIGN UP
export function firebaseSignUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN
export function firebaseLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGOUT
export function firebaseLogout() {
  return signOut(auth);
}
