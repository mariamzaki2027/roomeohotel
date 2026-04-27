import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),

      email: Yup.string()
        .required("Email is required")
        .test(
          "is-email",
          "Enter valid email address",
          (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           
            return emailRegex.test(value || "") ;
          }
        ),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .matches(/[A-Z]/, "Must contain at least one capital letter")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Must contain a special character"
        )
        .required("Password is required")
    }),

   onSubmit: async (values) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/api/auth/register",
      values
    );

    
    localStorage.setItem("userToken", res.data.token);

        const userData = {
      name: res.data.name,
      email: res.data.email
    };

    localStorage.setItem("user", JSON.stringify(userData));

    alert("Account created successfully! ✅");

    
    navigate("/");

  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Registration failed ❌");
  }
}
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold mb-5 text-[#4E598C]">
          Create Account
        </h2>

        {/* FORM */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* NAME */}
          <input
            placeholder="Full Name"
            {...formik.getFieldProps("name")}
            className="w-full p-3 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#BF1363] transition"
          />

          {/* EMAIL */}
          <input
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className="w-full p-3 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#BF1363] transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
            className="w-full p-3 border border-gray-200 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#BF1363] transition"
          />

          {/* ERRORS */}
          <div className="text-red-500 text-sm text-center min-h-[20px]">
            {formik.errors.name ||
              formik.errors.email ||
              formik.errors.password}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#BF1363] text-white py-3 rounded-lg font-semibold
            shadow-md hover:shadow-lg hover:scale-105 active:scale-95
            transition duration-300"
          >
            Create Account
          </button>

        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#BF1363] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;