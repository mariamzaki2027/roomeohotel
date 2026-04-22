import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mykonosImg from "../assets/mykonos.jpg";
import rioImg from "../assets/rio.jpg";

function Home() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleSearch = () => {
    if (
      !search.location.trim() ||
      !search.checkIn ||
      !search.checkOut ||
      !search.guests.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (search.checkIn < today) {
      alert("Check-in date cannot be in the past");
      return;
    }

    if (search.checkOut <= search.checkIn) {
      alert("Check-out must be after check-in");
      return;
    }

    if (isNaN(search.guests) || Number(search.guests) <= 0) {
      alert("Guests must be a valid number");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    navigate("/rooms", { state: search });
    }, 1500);
  };

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh" }}>

      {/* HERO */}
      <div
        style={{
          height: "400px",
          backgroundImage: `url(${rioImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        ></div>

        <div style={{ position: "relative", textAlign: "center" }}>
          <h1 style={{ fontSize: "45px", marginBottom: "10px" }}>
            Find your perfect stay
          </h1>
          <p>Discover amazing places around the world</p>
        </div>
      </div>

      {/* SEARCH */}
      <div style={searchWrapper}>
        <div style={searchBox}>
          <input
            placeholder="Where are you going?"
            value={search.location}
            onChange={(e) =>
              setSearch({ ...search, location: e.target.value })
            }
            style={inputStyle}
          />

          <input
            type="date"
            min={today}
            value={search.checkIn}
            onChange={(e) =>
              setSearch({ ...search, checkIn: e.target.value })
            }
            style={inputStyle}
          />

          <input
            type="date"
            min={search.checkIn || today}
            value={search.checkOut}
            onChange={(e) =>
              setSearch({ ...search, checkOut: e.target.value })
            }
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Guests"
            value={search.guests}
            onChange={(e) =>
              setSearch({ ...search, guests: e.target.value })
            }
            style={inputStyle}
          />

          <button onClick={handleSearch} style={buttonStyle}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {/* DESTINATIONS */}
      <div style={section}>
        <h2 style={title}>Popular Destinations</h2>

        <div style={gridBig}>
          <Card title="Mykonos" img={mykonosImg} showButton={false} />
          <Card title="Rio de Janeiro" img={rioImg} showButton={false} />
          <Card
            title="Paris"
            img="https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
            showButton={false}
          />
        </div>
      </div>

      {/* WHY */}
      <div style={whySection}>
        <h2 style={whyTitle}>Why choose ROOMEO?</h2>

        <div style={whyGrid}>
          <WhyCard
            icon="💰"
            title="Best Prices"
            text="Find the best deals worldwide"
          />
          <WhyCard
            icon="🔒"
            title="Secure Booking"
            text="Safe and fast reservations"
          />
          <WhyCard
            icon="💬"
            title="24/7 Support"
            text="We are here anytime"
          />
        </div>
      </div>

      {/* FEATURED STAYS */}
      <div style={section}>
        <h2 style={title}>Featured Stays</h2>

        <div style={gridBig}>
          <Card
            title="Beach Resort"
            img="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            showButton={true}
          />
          <Card
            title="Luxury Hotel"
            img="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            showButton={true}
          />
          <Card
            title="Yoga Retreat"
            img="https://images.unsplash.com/photo-1506126613408-eca07ce68773"
            showButton={true}
          />
        </div>
      </div>

    </div>
  );
}

/* CARD */
function Card({ title, img, showButton }) {
  return (
    <div
      style={cardBig}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "scale(1.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "scale(1)")
      }
    >
      <img src={img} style={imageBig} />

      <div style={overlay}>
        {title}

        {showButton && (
          <>
            <br />
            <button
              onClick={() => navigate("/hotel")}
              style={{
                marginTop: "8px",
                background: "#BF1363",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* WHY CARD */
function WhyCard({ icon, title, text }) {
  return (
    <div style={whyCard}>
      <div style={iconStyle}>{icon}</div>
      <h3 style={whyHeading}>{title}</h3>
      <p style={whyText}>{text}</p>
    </div>
  );
}

/* STYLES */

const searchWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "-60px",
  position: "relative",
  zIndex: 10,
};

const searchBox = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  background: "#BF1363",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
};

const section = {
  padding: "50px",
  textAlign: "center",
};

const title = {
  fontSize: "24px",
  color: "#4E598C",
};

const gridBig = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const cardBig = {
  width: "300px",
  height: "200px",
  borderRadius: "15px",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  transition: "0.3s",
};

const imageBig = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const overlay = {
  position: "absolute",
  bottom: "0",
  width: "100%",
  padding: "15px",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
};

const whySection = {
  background: "white",
  padding: "80px 20px",
  textAlign: "center",
};

const whyTitle = {
  fontSize: "28px",
  color: "#4E598C",
  marginBottom: "40px",
};

const whyGrid = {
  display: "flex",
  justifyContent: "center",
  gap: "60px",
  flexWrap: "wrap",
};

const whyCard = {
  width: "220px",
  padding: "25px",
  borderRadius: "15px",
  background: "#F5F5F5",
  boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
};

const whyHeading = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "10px",
  color: "#4E598C",
};

const whyText = {
  color: "gray",
  marginTop: "8px",
};

const iconStyle = {
  fontSize: "28px",
  background: "#BF1363",
  color: "white",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
};

export default Home;