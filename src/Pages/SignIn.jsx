import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EstateState } from "../context/EstateProvider";
import OAuth from "../Components/OAuth";

function SignIn() {
  const navigate = useNavigate();
  const { setUser } = EstateState();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setError(null);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      localStorage.setItem("loggedInUser", JSON.stringify(data));
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign In
        </button>
        <OAuth setError={setError} setLoading={setLoading} />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <div className="flex gap-2 mt-5">
        <Link to={"/forget-password"}>
          <span className="text-blue-700">forgot password?</span>
        </Link>
      </div>
      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}

export default SignIn;
