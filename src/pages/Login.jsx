import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .email("Enter a valid email"), // 🔥 simplified (backend supports email only)

      password: Yup.string().required("Password is required")
    }),

    onSubmit: async (values) => {
      setError("");
      setLoading(true);

      try {
        // ✅ CORRECT REQUEST
        const res = await axios.post(
          "http://127.0.0.1:5000/api/auth/login",
          {
            email: values.email,
            password: values.password
          }
        );

        // ✅ SAVE TOKEN
        localStorage.setItem("userToken", res.data.token);

        // ✅ SAVE USER INFO
        const userData = {
          name: res.data.name,
          email: res.data.email
        };

        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ UPDATE STATE
        if (setUser) setUser(userData);

        // ✅ REDIRECT
        navigate("/");

      } catch (err) {
        console.log(err.response?.data); // 🔥 see real backend error
        setError(
          err.response?.data?.message ||
          "Incorrect email or password"
        );
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h2 className="text-center text-2xl font-bold mb-5 text-[#4E598C]">
          Welcome Back
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <input
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="w-full p-3 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#BF1363]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className="w-full p-3 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#BF1363]"
          />

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#BF1363] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* VALIDATION ERRORS */}
          <div className="text-red-500 text-sm text-center min-h-[20px]">
            {formik.errors.email || formik.errors.password}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BF1363] text-white py-3 rounded-lg
            font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#BF1363] font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;