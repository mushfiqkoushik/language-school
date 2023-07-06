import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("");

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = (navigate) => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        if (user) {
          checkuser(user);
          navigate("/");
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };
  const checkuser = async (user) => {
    const response = await axios.get(
      `https://lanuage.onrender.com/user/${user?.email}`
    );
    if (response?.data?.email) {
      setUserRole(response.data?.role);
    } else {
      const userData = {
        name: user?.name,
        email: user?.email,
        photoUrl: user?.photoURL,
        role: "student",
      };
      setUserRole("student");
      const response = await axios.post(
        "https://lanuage.onrender.com/create-user",
        userData
      );
      console.log(response);
    }
  };
  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      setUser(loggedInUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = { registerUser, user, logOut, loginUser, googleLogin,setUserRole,userRole };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
