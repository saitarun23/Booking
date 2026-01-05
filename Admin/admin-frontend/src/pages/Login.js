import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const Signup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axiosClient.post("/login/signin", {
        emailid,
        password
      });

      if (res.data === "Admin Login Successfull") {
        localStorage.setItem("admin_token", "true");
        localStorage.setItem("admin_email", emailid);
        navigate("/");
      } else {
        alert(res.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await axiosClient.post("/login/signup", {
        emailid,
        password
      });

      alert(res.data);
      if (res.data === "Admin Account Created Successfully") {
        setIsSignup(false);
        setEmailid("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setEmailid("");
    setPassword("");
    setConfirmPassword("");
  };

  const signIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axiosClient.post("/login/signin", {
        emailid,
        password
      });

      if (res.data === "Admin Login Successfull") {
        localStorage.setItem("admin_token", "true");
        localStorage.setItem("admin_email", emailid);
        navigate("/");
      } else {
        alert(res.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card fade-in" onSubmit={isSignup ? signUp : signIn}>
        <h2>{isSignup ? "📝 Admin Signup" : "🔐 Admin Login"}</h2>
        <p style={{ color: "#7f8c8d", marginBottom: "25px" }}>
          {isSignup ? "Create a new admin account." : "Welcome back! Please sign in to your account."}
        </p>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isSignup && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <button 
          type="submit" 
          className={`btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (isSignup ? "Creating Account..." : "Signing In...") : (isSignup ? "Sign Up" : "Sign In")}
        </button>
        
        <div style={{ marginTop: "20px", fontSize: "14px", color: "#7f8c8d" }}>
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span 
            onClick={toggleMode}
            style={{ 
              color: "#667eea", 
              cursor: "pointer", 
              textDecoration: "underline" 
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </span>
        </div>
      </form>
    </div>
  );
}
