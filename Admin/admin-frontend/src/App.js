import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import ProtectedRoute from "./ProtectedRoute";
import SubServices from "./pages/SubServices";
import FoodTypes from "./pages/FoodTypes";
import FoodMenu from "./pages/FoodMenu";
import FoodItems from "./pages/FoodItems";
import FoodVariant from "./pages/FoodVariant";
import Venues from "./pages/Venues";
import Spots from "./pages/Spots";
import SpotImages from "./pages/SpotImages";
import Slots from "./pages/Slots";
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/login" element={<Login />} />

          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } 

          />

          <Route 
            path="/categories" 
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/subservices" 
            element={
              <ProtectedRoute>
                <SubServices />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/foodtypes" 
            element={
              <ProtectedRoute>
                <FoodTypes />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/foodmenu" 
            element={
              <ProtectedRoute>
                <FoodMenu />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/fooditems" 
            element={
              <ProtectedRoute>
                <FoodItems />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/foodvariant" 
            element={
              <ProtectedRoute>
                <FoodVariant />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/venues" 
            element={
              <ProtectedRoute>
                <Venues />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/spots"
            element={
              <ProtectedRoute>
                <Spots />
              </ProtectedRoute>
            }
          />

            <Route
            path="/spotimages"
            element={
              <ProtectedRoute>
                <SpotImages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/slots"
            element={
              <ProtectedRoute>
                <Slots />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
