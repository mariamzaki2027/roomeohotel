import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Hoteldetails from "./pages/Hoteldetails";
import Booking from "./pages/Booking";
import Rooms from "./pages/Rooms";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      <Route path="/hotel" element={<Hoteldetails />} />
<Route path="/login" element={<Login />} />
<Route path="/booking" element={<Booking />} />
<Route path="/rooms" element={<Rooms />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;