import { firebaseLogin } from "../firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await firebaseLogin(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-10 flex justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

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
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            state={{ from }}
            className="text-emerald-600 underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

