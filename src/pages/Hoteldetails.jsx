import React, { useState } from "react";

function Hoteldetails() {
  const [name, setName] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");

  const hotel = {
    title: "Luxury Hotel",
    location: "Cairo",
    price: 1200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  };

  function handleBooking() {
    if (!name || !checkin || !checkout) {
      alert("Please fill all fields ❗");
      return;
    }

    const days =
      (new Date(checkout) - new Date(checkin)) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * hotel.price;

    const booking = {
      name,
      hotel: hotel.title,
      price: hotel.price,
      checkin,
      checkout,
      totalPrice
    };

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking Confirmed ✅");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{hotel.title}</h1>

      <img
        src={hotel.image}
        alt="hotel"
        style={{ width: "300px", borderRadius: "10px" }}
      />

      <p>📍 {hotel.location}</p>
      <p>💰 {hotel.price} EGP / night</p>

      <h3>Book Now</h3>

      <input
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <label>Check-in</label><br />
      <input
        type="date"
        onChange={(e) => setCheckin(e.target.value)}
      />
      <br /><br />

      <label>Check-out</label><br />
      <input
        type="date"
        onChange={(e) => setCheckout(e.target.value)}
      />
      <br /><br />

      <button onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
}

export default Hoteldetails;