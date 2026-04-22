import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      form.email !== savedUser.email ||
      form.password !== savedUser.password
    ) {
      setError("Incorrect email or password");
      return;
    }

    alert("Login successful!");

    // GO HOME
    navigate("/");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Welcome Back</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          style={input}
        />

        <button onClick={handleLogin} style={button}>
          Login
        </button>

        <p style={text}>
          Don’t have an account?{" "}
          <Link to="/register" style={link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

/* SAME STYLES */

const container = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "80vh",
  background: "#F5F5F5",
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  width: "350px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#4E598C",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const button = {
  width: "100%",
  padding: "12px",
  background: "#BF1363",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  marginBottom: "10px",
  textAlign: "center",
};

const text = {
  textAlign: "center",
  marginTop: "10px",
};

const link = {
  color: "#BF1363",
  fontWeight: "bold",
};

export default Login;