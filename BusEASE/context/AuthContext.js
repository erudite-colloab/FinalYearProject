import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { loginRequest, registerRequest, resetPassword } from "./AuthService";
import { doc, getDoc, setDoc } from "firebase/firestore";
//import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    //const navigation = useNavigation();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (u) => {
        if (u) {
          const userDoc = await getDoc(doc(db, "users", u.uid));
          if(userDoc.exists()) {
            setUser({ uid: u.uid, ...userDoc.data() });
          }else {
            setUser(u);
          }
          setError(null);
          setIsAuthorized(true)
        }else {
          setIsAuthorized(false)
        }
    });

    return unsubscribe;
  }, []);
    
        
    const handleLogin =  async (email, password) => {
      setIsLoading(true);
      try{
        const data = await loginRequest(email.trim(), password);
        const userDoc = await getDoc(doc(db, "users", data.uid));
        if (userDoc.exists()){
          setUser({ uid: data.uid, ...userDoc.data() });
        }else {
          setUser(data);
        }
        setError(null);
        setIsLoading(false);
        setIsAuthorized(true);
      } catch(error) {
        console.log("error", error.code);
        setIsLoading(false);
        setIsAuthorized(false);
        handleAuthError(error);
      }
    };

    const handleSignUp =  async (email, password, username, phoneNumber) => {
      setIsLoading(true);
      try {
        const data = registerRequest(email.trim(), password)  
          await setDoc(doc(db, "users", data.uid), {
            username,
            phoneNumber,
            email: data.email,
            userId: data.uid,
            userType: "user",
            signUpDate: new Date().toUTCString(),
          });
          setUser({ uid: data.uid, username, phoneNumber, email: data.email, userType: "user", signUpDate: new Date().toUTCString() })
          setError(null);
          setIsLoading(false);
          setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        handleAuthError(error);
      }  
        //add user data to firestore
    } 
            
  const handleAuthError = (error) => {
    setError('An error occurred. Please try again.');

      switch (error.code){
        case 'auth/email-already-in-use':
          setError( 'Email already in use');
          break;
          case 'auth/invalid-email':
            setError( 'The email address is badly formatted.');
            break;
          case 'auth/invalid-credential':
            setError( 'Invalid credentials');
            break; 
          case 'auth/operation-not-allowed':
            setError( 'Password sign-in is disabled for this project.');
            break;
          case 'auth/weak-password':
            setError( 'The password is too weak.');
            break;
          case 'auth/network-request-failed':
            setError( 'A network error occurred. Please try again.');
            break;
          default:
            setError( error.message);
            break;
        }   
    }
      
    //naviagte to main
        
    //logout    
    const logout = () => {
        setUser(null);
        setIsAuthorized(false);
        signOut(auth);
    }

//password reset
    const passwordReset = (email) => {
        if  (!email) {
          Alert.alert('Please enter your email address');
          return;
        }
         //Handle send code lgic here 
        console.log('Send Code to:', email);
        
        resetPassword(email)
        .then(() => {
          alert("Password reset email sent");
          //navigation.navigate('OTPverification');
        })
        .catch((error) => {
          console.error("Error sending password reset email: ", error);
          Alert.alert("Failed to send password reset email. Please try again.")
        });      
    };
    

  
    const value = {
        user,
        error,
        isLoading,
        isAuthorized,
        handleLogin,
        handleSignUp,
        logout,
        passwordReset
        
    }
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}