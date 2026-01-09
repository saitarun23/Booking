import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import SubServices from "./pages/SubServices";
import FoodItems from "./pages/FoodItems";
import FoodDetail from "./pages/FoodDetail";
import FoodCart from "./pages/FoodCart";
import Venues from "./pages/Venues";
import Booking from "./pages/Booking";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/category/:id" element={<SubServices />} />
          <Route path="/service/:id" element={<Venues />} />
          <Route path="/food/:id" element={<FoodItems />} />
          <Route path="/food-detail/:id" element={<FoodDetail />} />
          <Route path="/food-cart" element={<FoodCart />} />

          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
