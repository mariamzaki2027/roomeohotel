import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Sync user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // ✅ LOGOUT FIX (NO reload)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken"); // 🔥 important
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="bg-[#4E598C] text-white px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h2 className="font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
        ROOMEO
      </h2>

      {/* LINKS */}
      <div className="flex items-center gap-6">

        <Link to="/" className="hover:underline">
          Home
        </Link>

        <Link to="/rooms" className="hover:underline">
          Rooms
        </Link>

        {/* USER SECTION */}
        {user ? (
          <div className="flex items-center gap-3">

            <span className="font-semibold">
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-[#BF1363] px-3 py-1 rounded hover:bg-pink-700 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link to="/login">
            <div className="w-10 h-10 rounded-full bg-[#BF1363] flex items-center justify-center cursor-pointer hover:scale-105 transition">
              👤
            </div>
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;