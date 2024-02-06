import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { EstateState } from "../context/EstateProvider";
import { useNavigate } from "react-router";

function OAuth() {
  const { setUser } = EstateState();
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
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

      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
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
