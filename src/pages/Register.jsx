import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    // VALIDATION
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // SAVE USER (localStorage = simple state)
    localStorage.setItem("user", JSON.stringify(form));

    alert("Account created successfully!");

    // GO TO LOGIN
    navigate("/login");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2 style={title}>Create Account</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={input}
        />

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

        <button onClick={handleRegister} style={button}>
          Create Account
        </button>

        <p style={text}>
          Already have an account?{" "}
          <Link to="/login" style={link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

/* STYLES */

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

export default Register;