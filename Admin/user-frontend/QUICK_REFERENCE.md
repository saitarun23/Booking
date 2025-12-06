# PLAYO-LITE Quick Reference Guide

## 🚀 Quick Start

```bash
# Install & Start
npm install
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 📍 Routes & Components

### Navigation Map
```
Home (/)
├── Categories → SubServices → Venues → VenueDetails
└── MyBookings (from navbar)
```

### Page Routes
| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Categories | Browse sports categories |
| `/category/:id` | SubServices | View services |
| `/service/:id` | Venues | Browse venues |
| `/venue/:id` | VenueDetails | Venue details + booking |
| `/spot/:id` | Slots | View time slots |
| `/book/:slotId` | BookSlot | Confirm booking |
| `/mybookings` | MyBookings | View history |

## 🎨 Component Quick Reference

### Import & Use Components

```jsx
// Navbar
import Navbar from "./components/Navbar";
<Navbar />

// Card
import Card from "./components/Card";
<Card item={{image, name, description}} onClick={handler} />

// HeroCarousel
import HeroCarousel from "./components/HeroCarousel";
<HeroCarousel images={[]} />

// BookingCard
import BookingCard from "./components/BookingCard";
<BookingCard venue={venue} spotId={spotId} onAddToCart={handler} />

// Cart
import Cart from "./components/Cart";
<Cart items={[]} onRemove={handler} />

// Loading
import Loading from "./components/Loading";
<Loading message="Loading..." />

// Error
import ErrorFallback from "./components/ErrorFallback";
<ErrorFallback error="Error message" onRetry={handler} />
```

## 📡 API Quick Reference

```jsx
import {
  getCategories,
  getSubServices,
  getVenues,
  getSpots,
  getSlots,
  bookSlot,
  myBookings
} from "../api/userApi";

// Usage
getCategories().then(res => setData(res.data));
getSubServices(categoryId).then(res => setData(res.data));
getVenues(serviceId).then(res => setData(res.data));
getSpots(venueId).then(res => setData(res.data));
getSlots(spotId, date).then(res => setData(res.data));
bookSlot({slotId, userEmail}).then(res => handleSuccess());
myBookings(email).then(res => setBookings(res.data));
```

## 🛠️ Utility Functions

```jsx
import {
  formatCurrency,
  formatDate,
  formatTime,
  formatDateTime,
  isValidEmail,
  showNotification,
  calculateTotal,
  getStatusColor,
  truncateText,
  getInitials
} from "../utils/helpers";

// Usage
const price = formatCurrency(500); // ₹500.00
const date = formatDate("2024-01-15"); // 15 January 2024
const time = formatTime("2024-01-15T10:30:00"); // 10:30 AM
const valid = isValidEmail("user@email.com"); // true
showNotification("Success!", "success");
const {subtotal, tax, total} = calculateTotal([items]);
const color = getStatusColor("confirmed"); // bg-green-100...
const short = truncateText("Long text...", 10); // Long te...
const initials = getInitials("John Doe"); // JD
```

## 🎯 Common Patterns

### Loading Pattern
```jsx
if (loading) return <Loading />;
if (error) return <ErrorFallback error={error} />;
if (!data) return <div>No data</div>;
return <Content />;
```

### State Pattern
```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [searched, setSearched] = useState(false);
```

### API Call Pattern
```jsx
useEffect(() => {
  setLoading(true);
  apiFunction(param)
    .then(res => setData(res.data || []))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [param]);
```

### Cart Pattern
```jsx
function addToCart(item) {
  setCart(c => [...c, item]);
  showNotification("Added to cart!", "success");
}

function removeFromCart(idx) {
  setCart(c => c.filter((_, i) => i !== idx));
}
```

## 🎨 Tailwind Classes Quick Ref

### Colors
```html
<!-- Green (primary) -->
<div class="bg-green-600 text-green-600 border-green-600"></div>

<!-- Red (error) -->
<div class="bg-red-600 text-red-600 border-red-600"></div>

<!-- Gray (neutral) -->
<div class="bg-gray-600 text-gray-600 border-gray-600"></div>
```

### Buttons
```html
<!-- Primary -->
<button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
  Action
</button>

<!-- Secondary -->
<button class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
  Cancel
</button>

<!-- Disabled -->
<button class="bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</button>
```

### Grid Layouts
```html
<!-- 4-column grid (responsive) -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

<!-- 2-column grid -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

<!-- Flex center -->
<div class="flex justify-center items-center">
```

### Cards
```html
<div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
  <!-- Content -->
</div>
```

## 📱 Responsive Breakpoints

```
sm: 640px    - Tablets portrait
md: 768px    - Tablets landscape
lg: 1024px   - Small desktops
xl: 1280px   - Large desktops
```

## 🔐 Form Validation

```jsx
// Email
if (!isValidEmail(email)) {
  setError("Invalid email");
  return;
}

// Required field
if (!value) {
  setError("Field is required");
  return;
}

// Min length
if (value.length < 6) {
  setError("Too short");
  return;
}
```

## 💾 Local Storage

```jsx
// Save
localStorage.setItem("key", JSON.stringify(data));

// Get
const data = JSON.parse(localStorage.getItem("key"));

// Remove
localStorage.removeItem("key");

// Clear all
localStorage.clear();
```

## 🎯 State Management Examples

### Simple State
```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
```

### Object State
```jsx
const [form, setForm] = useState({
  name: "",
  email: "",
  message: ""
});

function handleChange(e) {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
}
```

### Array State (Cart)
```jsx
// Add item
setCart(c => [...c, newItem]);

// Remove by index
setCart(c => c.filter((_, i) => i !== idx));

// Update item
setCart(c => c.map((item, i) => 
  i === idx ? {...item, ...updates} : item
));

// Clear
setCart([]);
```

## 🔄 Effect Patterns

### Run once on mount
```jsx
useEffect(() => {
  // Load data
}, []);
```

### Run when dependency changes
```jsx
useEffect(() => {
  // Reload data
}, [id]);
```

### Cleanup on unmount
```jsx
useEffect(() => {
  const handler = () => console.log("clicked");
  window.addEventListener("click", handler);
  
  return () => {
    window.removeEventListener("click", handler);
  };
}, []);
```

## 🚨 Error Handling

```jsx
try {
  const res = await apiFunction();
  setData(res.data);
} catch (err) {
  setError(err.message || "Something went wrong");
  console.error(err);
}
```

## 📊 Data Transformation

```jsx
// Map over array
const items = data.map(item => ({
  ...item,
  formatted: formatCurrency(item.price)
}));

// Filter array
const active = data.filter(item => item.status === "active");

// Reduce array
const total = items.reduce((sum, item) => sum + item.price, 0);

// Sort array
const sorted = items.sort((a, b) => a.price - b.price);
```

## ⌨️ Keyboard Events

```jsx
// Enter key
const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
};

// Usage
<input onKeyPress={handleKeyPress} />
```

## 🔗 Navigation

```jsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

// Go to route
navigate("/path");

// Go with params
navigate(`/venue/${id}`);

// Go back
navigate(-1);

// Replace history
navigate("/path", { replace: true });
```

## 📦 Environment Variables

```bash
# .env file
REACT_APP_API_BASE_URL=http://localhost:8181/user

# Access in code
const baseURL = process.env.REACT_APP_API_BASE_URL;
```

## 🐛 Debugging

```jsx
// Console log
console.log("Value:", value);
console.error("Error:", error);
console.table(arrayOfObjects);

// React DevTools
// Install React DevTools extension

// Network debugging
// Open DevTools → Network tab → Filter by API calls

// Local Storage
// DevTools → Application → Local Storage
```

## ⚡ Performance Tips

1. Use React DevTools Profiler
2. Check console for warnings
3. Use useCallback for expensive functions
4. Memoize components with React.memo
5. Optimize images with proper sizing
6. Code splitting with React.lazy
7. Debounce API calls

## 📚 File Locations

```
Component
  ↓
src/components/ComponentName.js

Page
  ↓
src/pages/PageName.js

API
  ↓
src/api/userApi.js

Utils
  ↓
src/utils/helpers.js

Config
  ↓
src/config.js
```

## 🎯 Common Mistakes to Avoid

1. ❌ Missing dependency in useEffect
2. ❌ Modifying state directly
3. ❌ Missing key in list render
4. ❌ Infinite loops in useEffect
5. ❌ Async in useEffect without cleanup
6. ❌ Not handling API errors
7. ❌ Hardcoding API URLs
8. ❌ Missing loading states

## ✅ Best Practices

1. ✅ Always handle loading state
2. ✅ Always handle error state
3. ✅ Validate user input
4. ✅ Use semantic HTML
5. ✅ Keep components small
6. ✅ Use meaningful variable names
7. ✅ Add comments for complex logic
8. ✅ Test components before deploying

## 🔗 Useful Links

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Swiper: https://swiperjs.com
- Axios: https://axios-http.com
- React Router: https://reactrouter.com

---

**Need more help? Check DEVELOPMENT.md or README.md**
