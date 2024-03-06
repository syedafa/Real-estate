import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { EstateState } from "../context/EstateProvider";

function ForgetPassword() {
  //   const { ForgetPassword, setForgetPassword } = EstateState();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("submitted");
    // console.log(email);
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log("error in data", data);
        setError(data.message);
        setLoading(false);
        return;
      }

      navigate(`/sign-in`);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Forget Password
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
          value={email}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          submit
        </button>
      </form>
      {/* <div className="flex gap-2 mt-5">
    <p>Dont have an account?</p>
    <Link to={"/sign-up"}>
      <span className="text-blue-700">Sign Up</span>
    </Link>
  </div>
  <div className="flex gap-2 mt-5">
    <Link to={"/forget-password"}>
      <span className="text-blue-700">forgot password?</span>
    </Link>
  </div> */}
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}

export default ForgetPassword;
