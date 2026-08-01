import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await loginUser(
        email,
        password,
      );

      login(response.access_token);

      navigate("/dashboard");
    } catch (err: any) {
        console.log("FULL ERROR:", err.response);

        const detail = err?.response?.data?.detail;

        if (Array.isArray(detail)) {
            setError(detail[0].msg);
        } else if (typeof detail === "string") {
            setError(detail);
        } else {
            setError("Login failed.");
        }
        } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          AI Finance Manager
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Sign in to continue
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="hari@gmail.com"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}