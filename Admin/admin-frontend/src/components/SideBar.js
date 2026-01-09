import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/categories", label: "Categories", icon: "📁" },
    { path: "/subservices", label: "Sub-Services", icon: "🔧" },
    { path: "/fooditems", label: "Food Items", icon: "🍔" },
    { path: "/venues", label: "Venues", icon: "🏟️" },
    { path: "/spots", label: "Spots", icon: "📍" },
    { path: "/spotimages", label: "Spot Images", icon: "🖼️" },
    { path: "/slots", label: "Slots", icon: "⏰" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-links">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link 
                to={item.path} 
                className={location.pathname === item.path ? "active" : ""}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <Link to="/login" className="logout-btn">
          <span className="icon"></span>
          <span className="label">Logout</span>
        </Link>
      </div>
    </div>
  );
}
