// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Categories from "./pages/Categories";
import SubServices from "./pages/SubServices";
import Venues from "./pages/Venues";
import Booking from "./pages/Booking";

import FoodPage from "./pages/FoodPage";     // ✅ NEW COMBINED PAGE
import FoodCart from "./pages/FoodCart";

import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* MAIN */}
          <Route path="/" element={<Categories />} />
          <Route path="/category/:id" element={<SubServices />} />

          {/* PLAY / HALL BOOKING FLOW */}
          <Route path="/service/:id" element={<Venues />} />
          <Route path="/booking/:id" element={<Booking />} />

          {/* FOOD FLOW - SINGLE PAGE */}
          <Route path="/food/:serviceId" element={<FoodPage />} />
          <Route path="/food/cart" element={<FoodCart />} />

          {/* COMMON */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}
