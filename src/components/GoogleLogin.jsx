import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome, ${result.user.displayName}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
};

export default GoogleLogin;
