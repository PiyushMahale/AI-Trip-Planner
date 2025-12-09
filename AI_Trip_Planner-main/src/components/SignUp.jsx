import { firebaseSignUp } from "../firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await firebaseSignUp(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-10 flex justify-center">
      <form onSubmit={handleSignUp} className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-emerald-600 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from }}
            className="text-emerald-600 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

