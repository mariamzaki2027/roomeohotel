import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      style={{
        background: "#4E598C",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LOGO */}
      <h2 style={{ fontWeight: "bold" }}>ROOMEO</h2>

      {/* LINKS */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/rooms" style={linkStyle}>Rooms</Link>
        <Link to="/booking" style={linkStyle}>Booking</Link>

        {/* USER SECTION */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontWeight: "bold" }}>
              Hi, {user.name}
            </span>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              style={logoutBtn}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/register">
            <div style={profileIcon}>👤</div>
          </Link>
        )}
      </div>
    </div>
  );
}

/* STYLES */

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

const profileIcon = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#BF1363",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  cursor: "pointer",
};

const logoutBtn = {
  background: "#BF1363",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Navbar;