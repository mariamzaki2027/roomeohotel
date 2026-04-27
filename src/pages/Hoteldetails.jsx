import { useLocation, useNavigate } from "react-router-dom";

function Hoteldetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  if (!hotel) {
    return (
      <div className="text-center mt-20">
        <p>No hotel selected ❗</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full p-6">

        {/* IMAGE */}
        <img
          src={hotel.image}
          alt="hotel"
          className="w-full h-60 object-cover rounded-xl"
        />

        {/* INFO */}
        <h1 className="text-2xl font-bold mt-4">
          {hotel.title || hotel.name}
        </h1>

        <p className="text-gray-500 mt-2">
          📍 {hotel.location}
        </p>

        <p className="text-green-600 font-bold mt-2">
          💰 {hotel.price} EGP / night
        </p>

        {/* BUTTON ONLY */}
        <button
          onClick={() =>
            navigate("/booking", {
              state: { hotel }
            })
          }
          className="w-full mt-6 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
        >
          Book Now
        </button>

      </div>
    </div>
  );
}

export default Hoteldetails;