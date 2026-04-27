import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel || location.state;
  const token = localStorage.getItem("userToken");

  const [loading, setLoading] = useState(false);

  // ✅ AUTH GUARD
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // ❗ NO HOTEL
  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            No Hotel Selected
          </h2>

          <p className="text-gray-600 mb-6">
            Please choose a hotel first.
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }

  const pricePerNight = hotel.price || 120;

  // 🔥 IMAGE FIX
  const getImage = (img) => {
    if (!img) return "/hotel.jpg";
    if (img.startsWith("http")) return img;
    return `http://127.0.0.1:5000/${img}`;
  };

  const validationSchema = Yup.object({
    checkIn: Yup.date().required("Check-in is required"),
    checkOut: Yup.date()
      .required("Check-out is required")
      .test(
        "after-checkin",
        "Check-out must be after check-in",
        function (value) {
          const { checkIn } = this.parent;
          if (!checkIn || !value) return false;
          return new Date(value) > new Date(checkIn);
        }
      ),
    rooms: Yup.number().min(1).required("Rooms required"),
    guests: Yup.number().min(1).required("Guests required"),
  });

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const diff = new Date(checkOut) - new Date(checkIn);
    return diff / (1000 * 60 * 60 * 24);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* ✅ FIXED IMAGE */}
        <img
          src={getImage(hotel.image)}
          alt={hotel.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 md:p-8">

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {hotel.title}
          </h1>

          <p className="text-pink-600 text-xl font-semibold mb-8">
            ${pricePerNight} / night
          </p>

          <Formik
            initialValues={{
              checkIn: "",
              checkOut: "",
              rooms: 1,
              guests: 1,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const nights = calculateNights(
                values.checkIn,
                values.checkOut
              );

              const totalPrice =
                nights * pricePerNight * values.rooms;

              try {
                setLoading(true);

                await axios.post(
                  "http://127.0.0.1:5000/api/bookings",
                  {
                    hotelId: hotel._id,
                    checkin: values.checkIn,     // ✅ FIXED
                    checkout: values.checkOut,   // ✅ FIXED
                    guests: values.guests,
                    rooms: values.rooms,
                    totalPrice,
                    status: "confirmed",
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                alert("Booking successful 🎉");

                resetForm();
                navigate("/");

              } catch (error) {
                console.log(error.response?.data); // 👈 VERY IMPORTANT
                alert(
                  error.response?.data?.message ||
                  "Booking failed ❌"
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ values }) => {
              const nights = calculateNights(
                values.checkIn,
                values.checkOut
              );

              const totalPrice =
                nights * pricePerNight * values.rooms;

              return (
                <Form className="space-y-5">

                  {/* DATES */}
                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="block mb-1 font-medium">
                        Check In
                      </label>

                      <Field
                        type="date"
                        name="checkIn"
                        className="w-full border p-3 rounded-lg"
                      />

                      <ErrorMessage
                        name="checkIn"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Check Out
                      </label>

                      <Field
                        type="date"
                        name="checkOut"
                        className="w-full border p-3 rounded-lg"
                      />

                      <ErrorMessage
                        name="checkOut"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>

                  </div>

                  {/* ROOMS + GUESTS */}
                  <div className="grid md:grid-cols-2 gap-5">

                    <div>
                      <label className="block mb-1 font-medium">
                        Rooms
                      </label>

                      <Field
                        type="number"
                        name="rooms"
                        min="1"
                        className="w-full border p-3 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 font-medium">
                        Guests
                      </label>

                      <Field
                        type="number"
                        name="guests"
                        min="1"
                        className="w-full border p-3 rounded-lg"
                      />
                    </div>

                  </div>

                  {/* TOTAL */}
                  {totalPrice > 0 && (
                    <div className="bg-green-100 p-3 rounded text-center font-bold">
                      Total Price: ${totalPrice}
                    </div>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg"
                  >
                    {loading ? "Processing..." : "Confirm Booking"}
                  </button>

                </Form>
              );
            }}
          </Formik>

        </div>
      </div>
    </div>
  );
}

export default Booking;