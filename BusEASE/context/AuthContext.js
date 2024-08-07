import { createContext, useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, onAuthStateChanged   } from "firebase/auth";
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
        const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;
        //fetch user document from firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()){
          setUser({ uid: user.uid, ...userDoc.data() });
        }else {
          console.log("User Document does not exist,setting user with basic info");
          setUser({
            uid: user.uid,
            email: user.email,
            phoneNumber: user.phoneNumber || '',
            username: user.displayName || 'User', // Default values if not provided
          });
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
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const user = userCredential.user;
        //add user data to firestore
        await setDoc(doc(db, "users", user.uid), {
          Name: username,
          PhoneNumber: phoneNumber,
          Email: user.email,
          userId: user.uid,
          userType: "user",
          signUpDate: new Date().toUTCString(),
        });
          setUser({ 
            uid: user.uid, 
            username, phoneNumber, 
            email: user.email, 
            userType: "user", 
            signUpDate: new Date().toUTCString() 
          });
           // Reset error and loading state, and authorize user
          setError(null);
          setIsLoading(false);
          setIsAuthorized(true);
      } catch (error) {
        //handle and log errors
        console.error("Signup error:", error.code, error.message);
        setIsAuthorized(false);
        setIsLoading(false);
        handleAuthError(error);
      }    //add user data to firestore
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
    };
      
    //naviagte to main
    //logout    
    const logout = () => {
        setUser(null);
        setIsAuthorized(false);
        signOut(auth);
    }

//password reset
    const passwordReset = async (email) => {
        sendPasswordResetEmail(auth, email.trim())
        .then(() => {
          alert("Password reset email sent", "Check your email to reset your password." );
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