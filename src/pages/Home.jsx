import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import mykonosImg from "../assets/mykonos.jpg";
import rioImg from "../assets/rio.jpg";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [hotels, setHotels] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  // ✅ FETCH HOTELS
  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/hotels");
      setHotels(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIX IMAGE URL
  const getImage = (img) => {
    if (!img) return rioImg;

    if (img.startsWith("http")) return img;

    return `http://127.0.0.1:5000/${img}`;
  };

  const formik = useFormik({
    initialValues: {
      location: "",
      checkIn: "",
      checkOut: "",
      guests: "",
      petFriendly: false
    },

    validationSchema: Yup.object({
      location: Yup.string().required("Location is required"),
      checkIn: Yup.date().required().min(today, "No past dates"),
      checkOut: Yup.date().required().min(Yup.ref("checkIn"), "Invalid date"),
      guests: Yup.number().required().min(1, "At least 1 guest")
    }),

    onSubmit: (values) => {
      setError("");
      setLoading(true);

      setTimeout(() => {
        let results = hotels.filter((h) =>
          h.location.toLowerCase().includes(values.location.toLowerCase().trim())
        );

        setLoading(false);

        if (results.length === 0) {
          setError("No stays found for this search");
          return;
        }

        navigate("/rooms", {
          state: { results, search: values }
        });

      }, 500);
    }
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div
        className="h-[350px] md:h-[450px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${rioImg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">
            Find your perfect stay
          </h1>
          <p className="mt-2">Discover amazing places around the world</p>
        </div>
      </div>

      {/* SEARCH */}
      <form onSubmit={formik.handleSubmit} className="flex justify-center mt-6 px-4">
        <div className="bg-white p-5 rounded-xl shadow-lg flex flex-wrap gap-3 justify-center max-w-5xl w-full">

          <input
            name="location"
            placeholder="Where are you going?"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="checkIn"
            min={today}
            onChange={formik.handleChange}
            value={formik.values.checkIn}
            className="border p-2 rounded"
          />

          <input
            type="date"
            name="checkOut"
            min={formik.values.checkIn || today}
            onChange={formik.handleChange}
            value={formik.values.checkOut}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="guests"
            min="1"
            placeholder="Guests"
            onChange={formik.handleChange}
            value={formik.values.guests}
            className="border p-2 rounded w-[100px]"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="petFriendly"
              onChange={formik.handleChange}
              checked={formik.values.petFriendly}
            />
            Pet Friendly
          </label>

          <button className="bg-pink-600 text-white px-4 py-2 rounded">
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* ERRORS */}
      <div className="text-center text-red-500 mt-2">
        {formik.errors.location ||
          formik.errors.checkIn ||
          formik.errors.checkOut ||
          formik.errors.guests ||
          error}
      </div>

      {/* DESTINATIONS */}
      <Section title="Popular Destinations">
        <Card title="Mykonos" img={mykonosImg} />
        <Card title="Rio" img={rioImg} />
        <Card title="Paris" img={rioImg} />
      </Section>

      {/* WHY */}
      <div className="bg-white py-12 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">
          Why choose ROOMEO?
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          <WhyCard icon="💰" title="Best Prices" />
          <WhyCard icon="🔒" title="Secure Booking" />
          <WhyCard icon="💬" title="24/7 Support" />
        </div>
      </div>

      {/* FEATURED (FIXED IMAGES) */}
      <Section title="Featured Stays">
        {hotels.slice(0, 3).map((hotel) => (
          <Card
            key={hotel._id}
            title={hotel.title}
            img={getImage(hotel.image)} // ✅ FIXED
            showButton
            hotel={hotel}
          />
        ))}
      </Section>

    </div>
  );
}

/* SECTION */
function Section({ title, children }) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold text-blue-800">{title}</h2>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {children}
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, img, showButton, hotel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!showButton) return;

    navigate(`/hotel/${hotel._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-[300px] h-[200px] rounded-xl overflow-hidden relative shadow-lg 
      transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <img src={img} className="w-full h-full object-cover" />

      <div className="absolute bottom-0 w-full p-3 text-white font-bold bg-gradient-to-t from-black/70 to-transparent">
        {title}

        {showButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="mt-2 bg-pink-600 px-3 py-1 rounded"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

/* WHY */
function WhyCard({ icon, title }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl w-[200px]">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-bold">{title}</h3>
    </div>
  );
}

export default Home;