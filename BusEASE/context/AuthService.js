import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"

export const loginRequest = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const registerRequest = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const resetPassword = (email, password) => {
    return sendPasswordResetEmail(auth, email, password)
}
