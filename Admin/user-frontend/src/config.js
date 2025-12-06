// Configuration file for the application

const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8181/user",
    venueAPI: process.env.REACT_APP_VENUE_API || "http://localhost:8181/venue",
    timeout: 10000, // 10 seconds
  },

  // Application Settings
  app: {
    name: "PLAYO-LITE",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  },

  // Booking Settings
  booking: {
    taxRate: 0.05, // 5% tax
    minDuration: 1, // Minimum 1 hour
    maxDuration: 8, // Maximum 8 hours
    minDateOffset: 0, // Can book from today
  },

  // UI Settings
  ui: {
    itemsPerPage: 12,
    toastDuration: 2000, // 2 seconds
    animationDuration: 300, // 300ms
    imageLoadingTimeout: 5000, // 5 seconds
  },

  // Carousel Settings
  carousel: {
    autoplayDelay: 5000, // 5 seconds
    loop: true,
    navigation: true,
    pagination: true,
  },

  // Validation Rules
  validation: {
    minPasswordLength: 6,
    maxNameLength: 50,
    emailPattern: /^\S+@\S+\.\S+$/,
  },

  // Status Colors
  statusColors: {
    success: "green",
    error: "red",
    warning: "yellow",
    info: "blue",
    pending: "yellow",
    confirmed: "green",
    cancelled: "red",
  },

  // Date Formats
  dateFormats: {
    short: "dd/MM/yyyy",
    long: "dd MMMM yyyy",
    time: "hh:mm a",
    dateTime: "dd/MM/yyyy hh:mm a",
  },

  // Local Storage Keys
  storage: {
    userEmail: "PLAYO_USER_EMAIL",
    cart: "PLAYO_CART",
    preferences: "PLAYO_PREFERENCES",
    theme: "PLAYO_THEME",
  },

  // Feature Flags
  features: {
    enablePayment: false, // Set to true when payment integration is ready
    enableNotifications: false, // Set to true when notifications are ready
    enableSearch: false, // Set to true when search is implemented
    enableFavorites: false, // Set to true when favorites are implemented
  },
};

export default config;
