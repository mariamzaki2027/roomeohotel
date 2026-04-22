import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import miamiImg from "../assets/miami.jpg";
import franceImg from "../assets/france.jpg";
import rio2Img from "../assets/rio2.jpg";

function Rooms() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchData = location.state;

  const [rooms] = useState([
    {
      id: 1,
      title: "Hilton Hotel",
      desc: "Beautiful hotel in Paris",
      price: 120,
      rating: 4.5,
      image: franceImg,
    },
    {
      id: 2,
      title: "Miami Resort",
      desc: "Relaxing beach stay",
      price: 90,
      rating: 4.2,
      image: miamiImg,
    },
    {
      id: 3,
      title: "ND Yoga Retreat",
      desc: "Peaceful and relaxing stay",
      price: 150,
      rating: 3.9,
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    },
    {
      id: 4,
      title: "Four Seasons Rio De Janeiro",
      desc: "Luxury stay with ocean view in Rio",
      price: 180,
      rating: 4.9,
      image: rio2Img,
    },
  ]);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  /* FILTER + SORT */
  let filteredRooms = [...rooms];

  // Search from Home page
  if (searchData?.location) {
    filteredRooms = filteredRooms.filter(
      (room) =>
        room.title
          .toLowerCase()
          .includes(searchData.location.toLowerCase()) ||
        room.desc
          .toLowerCase()
          .includes(searchData.location.toLowerCase())
    );
  }

  // Price filter
  if (filter === "low") {
    filteredRooms = filteredRooms.filter((r) => r.price <= 100);
  }

  if (filter === "mid") {
    filteredRooms = filteredRooms.filter(
      (r) => r.price > 100 && r.price <= 150
    );
  }

  if (filter === "high") {
    filteredRooms = filteredRooms.filter((r) => r.price > 150);
  }

  // Sort
  if (sort === "low") {
    filteredRooms.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filteredRooms.sort((a, b) => b.price - a.price);
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#4E598C" }}>
        Available Rooms
      </h1>

      <div style={{ display: "flex", gap: "30px" }}>
        {/* FILTER SIDEBAR */}
        <div
          style={{
            width: "250px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            height: "fit-content",
          }}
        >
          <h2>Filters</h2>

          <button
            onClick={() => {
              setFilter("");
              setSort("");
            }}
            style={{
              marginBottom: "15px",
              background: "#4E598C",
              color: "white",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>

          <h4>Price Range</h4>

          <label>
            <input
              type="radio"
              name="price"
              onChange={() => setFilter("low")}
            />
            $0 - $100
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="price"
              onChange={() => setFilter("mid")}
            />
            $100 - $150
          </label>

          <br />

          <label>
            <input
              type="radio"
              name="price"
              onChange={() => setFilter("high")}
            />
            $150+
          </label>

          <h4 style={{ marginTop: "15px" }}>Sort</h4>

          <button onClick={() => setSort("low")}>
            Low → High
          </button>

          <button
            onClick={() => setSort("high")}
            style={{ marginLeft: "10px" }}
          >
            High → Low
          </button>
        </div>

        {/* ROOMS */}
        <div style={{ flex: 1 }}>
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              style={{
                display: "flex",
                background: "white",
                borderRadius: "12px",
                marginBottom: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={room.image}
                style={{
                  width: "250px",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px", flex: 1 }}>
                <h2>{room.title}</h2>

                <p style={{ color: "gray" }}>
                  {room.desc}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    ${room.price}
                  </span>

                  <span>⭐ {room.rating}</span>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem(
                      "selectedHotel",
                      JSON.stringify(room)
                    );

                    navigate("/booking");
                  }}
                  style={{
                    marginTop: "10px",
                    background: "#BF1363",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}

          {filteredRooms.length === 0 && (
            <p>No matching rooms found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;