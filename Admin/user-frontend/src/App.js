import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Categories from "./pages/Categories";
import SubServices from "./pages/SubServices";
import Venues from "./pages/Venues";
import Spots from "./pages/Spots";
import Slots from "./pages/Slots";
import BookSlot from "./pages/BookSlot";
import VenueDetails from "./pages/VenueDetails";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/category/:id" element={<SubServices />} />
          <Route path="/service/:id" element={<Venues />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/spot/:id" element={<Slots />} />
          <Route path="/book/:slotId" element={<BookSlot />} />
        </Routes>
      </div>
    </Router>
  );
}
