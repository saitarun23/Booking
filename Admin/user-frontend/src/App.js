import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import SubServices from "./pages/SubServices";
import Venues from "./pages/Venues";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/category/:id" element={<SubServices />} />
          <Route path="/service/:id" element={<Venues />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
