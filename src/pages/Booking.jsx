const savedHotel = JSON.parse(localStorage.getItem("selectedHotel"));
import franceImg from "../assets/france.jpg";
import { useState } from "react";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    checkIn: "",
    checkOut: "",
    rooms: 1,
    guests: 1,
  });

  const [errors, setErrors] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

const pricePerNight = savedHotel?.price || 120;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.checkIn) err.checkIn = "Check-in is required";
    if (!form.checkOut) err.checkOut = "Check-out is required";

    if (form.checkIn && form.checkOut && form.checkOut <= form.checkIn) {
      err.checkOut = "Check-out must be after check-in";
    }

    if (form.rooms < 1) err.rooms = "At least 1 room required";
    if (form.guests < 1) err.guests = "At least 1 guest required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const days =
        (new Date(form.checkOut) - new Date(form.checkIn)) /
        (1000 * 60 * 60 * 24);

      const total = days * pricePerNight * form.rooms;

      setTotalPrice(total);

      alert("Booking successful 🎉");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* HOTEL INFO */}
        <div style={formContainerStyle}>
          <h2 style={titleStyle}>{savedHotel?.title || "Hotel"}</h2>

          <img
 src={savedHotel?.image}
  alt="Hotel"
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          />

          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            💰 ${pricePerNight} / night
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div>
              <label style={labelStyle}>Your Name</label>
              <input
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.name && <p style={errorStyle}>{errors.name}</p>}
            </div>

            {/* CHECK-IN */}
            <div>
              <label style={labelStyle}>Check-in</label>
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.checkIn && <p style={errorStyle}>{errors.checkIn}</p>}
            </div>

            {/* CHECK-OUT */}
            <div>
              <label style={labelStyle}>Check-out</label>
              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                style={inputStyle}
              />
              {errors.checkOut && <p style={errorStyle}>{errors.checkOut}</p>}
            </div>

            {/* ROOMS & GUESTS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Rooms</label>
                <input
                  type="number"
                  name="rooms"
                  min="1"
                  value={form.rooms}
                  onChange={handleChange}
                  style={inputStyle}
                />
                {errors.rooms && <p style={errorStyle}>{errors.rooms}</p>}
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Guests</label>
                <input
                  type="number"
                  name="guests"
                  min="1"
                  value={form.guests}
                  onChange={handleChange}
                  style={inputStyle}
                />
                {errors.guests && <p style={errorStyle}>{errors.guests}</p>}
              </div>
            </div>

            {/* BUTTON */}
            <button type="submit" style={buttonStyle}>
              Confirm & Pay
            </button>
          </form>

          {/* TOTAL */}
          {totalPrice > 0 && (
            <div style={totalStyle}>
              Total Price: ${totalPrice} 
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* STYLES */

const containerStyle = {
  minHeight: "100vh",
  backgroundColor: "#F5F5F5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "Arial",
};

const cardStyle = {
  maxWidth: "700px",
  width: "100%",
  backgroundColor: "white",
  borderRadius: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
};

const formContainerStyle = {
  padding: "30px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#4E598C",
  marginBottom: "15px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginTop: "5px",
  marginBottom: "10px",
};

const labelStyle = {
  fontWeight: "bold",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#BF1363",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  marginTop: "10px",
  cursor: "pointer",
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
};

const totalStyle = {
  marginTop: "20px",
  padding: "12px",
  backgroundColor: "#D1FAE5",
  borderRadius: "10px",
  textAlign: "center",
  fontWeight: "bold",
};

export default Booking;