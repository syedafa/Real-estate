import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const { id, token } = useParams();
  console.log(id, token);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setError("Password and confirm password does not matches");
        return;
      }
      const res = await fetch(`/api/auth/reset-password/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
        setLoading(false);

        return;
      }
      setLoading(false);
      navigate("/sign-in");
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
          type="password"
          placeholder="New Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-3 rounded-lg"
          id="confirm_password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError(false);
          }}
          value={confirmPassword}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          submit
        </button>
      </form>

      {error && <p className="text-red-700">{error}</p>}
    </div>
  );
}

export default ResetPassword;
