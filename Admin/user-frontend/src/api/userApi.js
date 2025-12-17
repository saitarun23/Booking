import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8181/user",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Disable cookies to reduce header size
});

// Request interceptor to prevent header bloat
API.interceptors.request.use(
  (config) => {
    // Remove unnecessary headers that might accumulate
    delete config.headers["Authorization"]; // Only add if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 431) {
      console.error(
        "Request header too large. Clear browser cache and cookies for localhost:3000"
      );
    }
    return Promise.reject(error);
  }
);

export const getCategories = () => API.get("/categories");

export const getSubServices = (categoryId) =>
  API.get(`/subservices/${categoryId}`);

export const getVenues = (serviceId) =>
  API.get(`/venues/${serviceId}`);

export const getSpots = (venueId) =>
  API.get(`/spots/${venueId}`);

export const getSlots = (spotId, date) =>
  API.get(`/slots/${spotId}?date=${date}`);

export const checkAvailability = (spotId, date, startTime, endTime) =>
  API.get(`/slot/check-availability?spotId=${spotId}&date=${date}&startTime=${startTime}&endTime=${endTime}`);

export const Booking = (data) => API.post("/book", data);

export const myBookings = (email) =>
  API.get(`/mybookings/${email}`);
