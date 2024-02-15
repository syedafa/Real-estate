/* eslint-disable react/prop-types */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { EstateState } from "../context/EstateProvider";
import { useNavigate } from "react-router";
// import { useState } from "react";

function OAuth({ setError, setLoading }) {
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { setUser } = EstateState();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log("could not sign in with google", error);
      setError(error);
      setLoading(false);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      continue with google
    </button>
  );
}

export default OAuth;
