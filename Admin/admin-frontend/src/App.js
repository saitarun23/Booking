import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import ProtectedRoute from "./ProtectedRoute";
import SubServices from "./pages/SubServices";
import Venues from "./pages/Venues";
import Spots from "./pages/Spots";
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
