// Format currency with rupee symbol
export const formatCurrency = (amount) => {
  return `₹${(amount || 0).toFixed(2)}`;
};

// Format date to readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format time to 12-hour format
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Format date and time together
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN") + " " + formatTime(dateString);
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// Show notification toast
export const showNotification = (message, type = "success", duration = 2000) => {
  const notif = document.createElement("div");
  const bgColor =
    type === "success"
      ? "bg-green-600"
      : type === "error"
        ? "bg-red-600"
        : "bg-blue-600";
  notif.className = `fixed top-20 right-4 ${bgColor} text-white px-4 py-3 rounded shadow z-50`;
  notif.textContent = (type === "success" ? "✓ " : "✕ ") + message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), duration);
};

// Calculate total price with tax
export const calculateTotal = (items, taxRate = 0.05) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = subtotal * taxRate;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
};

// Get status badge color
export const getStatusColor = (status) => {
  const statusLower = status?.toLowerCase();
  switch (statusLower) {
    case "confirmed":
    case "active":
    case "available":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
    case "rejected":
    case "booked":
    case "unavailable":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Truncate text
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return "UN";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

// Wait function for delays
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get days between two dates
export const getDaysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
};

// Convert 24-hour time to 12-hour
export const to12Hour = (time24) => {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${period}`;
};
