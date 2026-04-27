import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Rooms() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchData = location.state?.search || {};

  const [rooms, setRooms] = useState([]); // 🔥 from backend
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FETCH ROOMS
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:5000/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX IMAGE
  const getImage = (img) => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:5000/${img}`;
  };

  let filteredRooms = [...rooms];

  /* 🔍 SEARCH (FROM HOME) */
  if (searchData.location) {
    filteredRooms = filteredRooms.filter((room) =>
      room.locationTag
        ?.toLowerCase()
        .includes(searchData.location.toLowerCase().trim())
    );
  }

  /* 💰 PRICE FILTER */
  if (filter === "low") filteredRooms = filteredRooms.filter((r) => r.price <= 100);
  if (filter === "mid") filteredRooms = filteredRooms.filter((r) => r.price > 100 && r.price <= 150);
  if (filter === "high") filteredRooms = filteredRooms.filter((r) => r.price > 150);

  /* 🔽 SORT */
  if (sort === "low") filteredRooms.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredRooms.sort((a, b) => b.price - a.price);

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        Available Rooms
      </h1>

      <div className="flex flex-col md:flex-row gap-6">

        {/* SIDEBAR */}
        <div className="bg-white p-4 rounded-xl shadow w-full md:w-[250px]">
          <h2 className="font-bold mb-3">Filters</h2>

          <button
            onClick={() => {
              setFilter("");
              setSort("");
            }}
            className="mb-4 bg-blue-700 text-white px-3 py-1 rounded"
          >
            Clear
          </button>

          <h4 className="font-semibold">Price</h4>

          <label className="block">
            <input type="radio" name="price" onChange={() => setFilter("low")} />
            $0 - $100
          </label>

          <label className="block">
            <input type="radio" name="price" onChange={() => setFilter("mid")} />
            $100 - $150
          </label>

          <label className="block">
            <input type="radio" name="price" onChange={() => setFilter("high")} />
            $150+
          </label>

          <h4 className="mt-4 font-semibold">Sort</h4>

          <button onClick={() => setSort("low")} className="mr-2">
            Low → High
          </button>

          <button onClick={() => setSort("high")}>
            High → Low
          </button>
        </div>

        {/* ROOMS */}
        <div className="flex-1">

          {loading && <p>Loading rooms...</p>}

          {filteredRooms.length === 0 && !loading && (
            <p className="text-red-500">
              No matching rooms found.
            </p>
          )}

          {filteredRooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow mb-4 flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={getImage(room.image)}
                className="w-full md:w-[250px] h-[180px] object-cover"
              />

              <div className="p-4 flex-1">
                <h2 className="text-lg font-bold">{room.title}</h2>

                <p className="text-gray-500">{room.desc}</p>

                <div className="flex justify-between mt-2">
                  <span className="text-green-600 font-bold">
                    ${room.price}
                  </span>
                  <span>⭐ {room.rating}</span>
                </div>

                <button
                  onClick={() =>
                    navigate("/booking", { state: { room } })
                  }
                  className="mt-3 bg-pink-600 text-white px-4 py-2 rounded"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Rooms;