# PLAYO-LITE Frontend Development Guide

## Overview

This is a complete React-based sports venue booking application. It provides users with the ability to browse sports categories, find venues, check availability, and book time slots.

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend API running on `http://localhost:8181`

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open browser
# Navigate to http://localhost:3000
```

## Project Architecture

### Directory Structure

```
src/
├── api/
│   └── userApi.js                 # Axios configuration & API calls
├── components/
│   ├── Navbar.js                  # Navigation bar
│   ├── Card.js                    # Reusable card component
│   ├── HeroCarousel.js            # Swiper carousel
│   ├── BookingCard.js             # Booking form
│   ├── Cart.js                    # Shopping cart
│   ├── Loading.js                 # Loading spinner
│   └── ErrorFallback.js           # Error boundary
├── pages/
│   ├── Categories.js              # Category listing
│   ├── SubServices.js             # Services under category
│   ├── Venues.js                  # Venue listing
│   ├── Spots.js                   # Spots in a venue
│   ├── Slots.js                   # Available slots
│   ├── VenueDetails.js            # Detailed venue view (NEW)
│   ├── BookSlot.js                # Booking confirmation
│   └── MyBookings.js              # Booking history
├── utils/
│   └── helpers.js                 # Utility functions
├── App.js                         # Main router
└── index.js                       # Entry point
```

### Data Flow Architecture

```
Categories (page)
    ↓
SubServices (page)
    ↓
Venues (page)
    ↓
VenueDetails (page) → HeroCarousel, BookingCard, Cart
    ↓
Slots (page)
    ↓
BookSlot (page)
    ↓
MyBookings (page)
```

## Component Documentation

### 1. **Navbar Component**
**Location:** `src/components/Navbar.js`

A fixed sticky navigation bar with:
- Logo/Brand name
- My Bookings link
- Login/Signup button

```jsx
<Navbar />
```

**Props:** None

**Features:**
- Sticky positioning
- Responsive design
- Green theme

---

### 2. **Card Component**
**Location:** `src/components/Card.js`

Reusable card for displaying items (categories, services, venues).

```jsx
<Card
  item={{
    image: "url",
    name: "Item Name",
    description: "Description"
  }}
  onClick={() => navigate("/path")}
/>
```

**Props:**
- `item`: Object with `image`, `name`, `description`
- `onClick`: Click handler

**Features:**
- Base64 image support
- Fallback placeholder images
- Hover effects
- Responsive layout

---

### 3. **HeroCarousel Component**
**Location:** `src/components/HeroCarousel.js`

Image carousel using Swiper library.

```jsx
<HeroCarousel images={venue?.images || []} />
```

**Props:**
- `images`: Array of image URLs

**Features:**
- Auto-rotate every 5 seconds
- Navigation arrows
- Pagination dots
- Fallback images
- Error handling

---

### 4. **BookingCard Component**
**Location:** `src/components/BookingCard.js`

Main booking form component with:
- Date picker
- Slot selection
- Duration adjustment
- Court selection
- Price preview

```jsx
<BookingCard
  venue={venue}
  spotId={selectedSpot}
  onAddToCart={handleAddToCart}
/>
```

**Props:**
- `venue`: Object with venue details and spots
- `spotId`: Currently selected spot ID
- `onAddToCart`: Callback function

**Features:**
- Real-time slot loading
- Loading states
- Error handling
- Price calculation
- Duration selector

---

### 5. **Cart Component**
**Location:** `src/components/Cart.js`

Shopping cart displaying booked slots.

```jsx
<Cart items={cart} onRemove={handleRemove} />
```

**Props:**
- `items`: Array of cart items
- `onRemove`: Remove item callback

**Features:**
- Item display
- Price calculation with tax
- Remove functionality
- Checkout button
- Empty state handling

---

### 6. **Loading Component**
**Location:** `src/components/Loading.js`

Centered loading spinner.

```jsx
<Loading message="Loading venues..." />
```

**Props:**
- `message`: Optional loading message

---

### 7. **ErrorFallback Component**
**Location:** `src/components/ErrorFallback.js`

Error state display with retry option.

```jsx
<ErrorFallback
  error="Error message"
  onRetry={handleRetry}
/>
```

**Props:**
- `error`: Error message
- `onRetry`: Retry callback

---

## Page Documentation

### Categories Page
Browse all available sports categories.

**Route:** `/`

**Features:**
- Grid layout
- Loading state
- Error handling
- Responsive design

---

### SubServices Page
View services under a category.

**Route:** `/category/:id`

**Features:**
- Dynamic category loading
- Navigation to venues

---

### Venues Page
Browse venues offering a service.

**Route:** `/service/:id`

**Features:**
- Venue listing with images
- Address display
- Click to navigate

---

### VenueDetails Page (NEW)
Comprehensive venue information with booking.

**Route:** `/venue/:id`

**Components Used:**
- HeroCarousel (images)
- Spots listing
- BookingCard (sidebar)
- Cart (sidebar)

**Features:**
- Carousel for venue images
- Multiple spots display
- Real-time slot availability
- Integrated booking & cart

---

### Spots Page
Show all spots in a venue.

**Route:** `/venue/:id` (old route)

**Features:**
- Spot listing with details
- Price and capacity info
- Click to view slots

---

### Slots Page
Display available time slots.

**Route:** `/spot/:id`

**Features:**
- Date picker filter
- Slot listing
- Availability status
- Direct booking option

---

### BookSlot Page
Confirm a booking with email.

**Route:** `/book/:slotId`

**Features:**
- Email input
- Email validation
- Booking confirmation
- Error handling

---

### MyBookings Page
View booking history.

**Route:** `/mybookings`

**Features:**
- Email search
- Booking status display
- Payment status indicator
- Color-coded badges

---

## API Integration

### API Configuration
**File:** `src/api/userApi.js`

**Base URL:** `http://localhost:8181/user`

**Endpoints:**

| Method | Endpoint | Function |
|--------|----------|----------|
| GET | `/categories` | `getCategories()` |
| GET | `/subservices/:id` | `getSubServices(categoryId)` |
| GET | `/venues/:id` | `getVenues(serviceId)` |
| GET | `/spots/:id` | `getSpots(venueId)` |
| GET | `/slots/:id?date=YYYY-MM-DD` | `getSlots(spotId, date)` |
| POST | `/book` | `bookSlot(data)` |
| GET | `/bookings/:email` | `myBookings(email)` |

### Request/Response Format

**Book Slot Request:**
```json
{
  "slotId": "slot_123",
  "userEmail": "user@email.com"
}
```

**Get Slots Response:**
```json
[
  {
    "slotId": "slot_1",
    "slotStartTime": "2024-01-15T10:00:00",
    "slotEndTime": "2024-01-15T11:00:00",
    "slotPrice": 500,
    "slotActive": true
  }
]
```

## Styling Guide

### Tailwind CSS Configuration

**Colors:**
- Primary: `green-600` (#16a34a)
- Secondary: `gray` (various)
- Success: `green`
- Error: `red`
- Warning: `yellow`
- Info: `blue`

### Common Classes

**Buttons:**
```html
<!-- Primary Button -->
<button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
  Action
</button>

<!-- Secondary Button -->
<button class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
  Secondary
</button>
```

**Cards:**
```html
<div class="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
  <!-- Content -->
</div>
```

**Grid Layouts:**
```html
<!-- Categories/Venues -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
</div>

<!-- Bookings -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
</div>
```

## Utility Functions

**File:** `src/utils/helpers.js`

Available functions:
- `formatCurrency(amount)` - Format to rupees
- `formatDate(dateString)` - Format date
- `formatTime(dateString)` - Format time
- `formatDateTime(dateString)` - Format date + time
- `isValidEmail(email)` - Email validation
- `showNotification(message, type, duration)` - Toast notification
- `calculateTotal(items, taxRate)` - Calculate with tax
- `getStatusColor(status)` - Get status badge color
- `truncateText(text, length)` - Truncate text

**Usage:**
```jsx
import { formatCurrency, showNotification } from "../utils/helpers";

const price = formatCurrency(500); // ₹500.00
showNotification("Booking added!", "success"); // Toast
```

## State Management

Each page manages its own state using React hooks:

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

**Cart State (in VenueDetails):**
```jsx
const [cart, setCart] = useState([]);

function handleAddToCart(item) {
  setCart(c => [...c, item]);
}
```

## Error Handling Strategy

1. **API Errors:**
   - Try-catch blocks
   - User-friendly messages
   - Retry options

2. **Validation Errors:**
   - Email validation
   - Date validation
   - Required field checks

3. **UI Errors:**
   - ErrorFallback component
   - Error state display
   - Recovery options

## Performance Optimization

1. **Image Optimization:**
   - Lazy loading (Swiper)
   - Placeholder images
   - Base64 support

2. **API Calls:**
   - Debounced requests
   - Proper loading states
   - Error caching

3. **Rendering:**
   - Optimized re-renders
   - Callback memoization
   - List key optimization

## Common Patterns

### Loading Pattern
```jsx
if (loading) return <Loading message="Loading..." />;
if (error) return <ErrorFallback error={error} />;
if (!data) return <div>No data available</div>;

return <YourContent />;
```

### API Call Pattern
```jsx
useEffect(() => {
  setLoading(true);
  apiFunction(id)
    .then(res => setData(res.data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, [id]);
```

### Cart Management Pattern
```jsx
function addToCart(item) {
  setCart(c => [...c, item]);
  showNotification("Added to cart!", "success");
}

function removeFromCart(idx) {
  setCart(c => c.filter((_, i) => i !== idx));
}
```

## Debugging Tips

1. **React DevTools**
   - Install browser extension
   - Inspect component props
   - Check state changes

2. **Network Tab**
   - Monitor API calls
   - Check request/response
   - Verify headers

3. **Console Logs**
   - Add strategic console.logs
   - Check for errors/warnings
   - Verify data flow

4. **Local Storage**
   - Inspect saved data
   - Clear cache if needed

## Build & Deployment

### Build for Production
```bash
npm run build
```

### Output
- Optimized bundle in `build/` folder
- Minified CSS/JS
- Source maps for debugging

### Deployment Steps
1. Build the project
2. Copy `build/` contents to server
3. Configure server for SPA routing
4. Update API endpoint for production

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill existing process
npx kill-port 3000

# Or run on different port
PORT=3001 npm start
```

### API Not Connecting
- Check backend is running
- Verify API URL in `userApi.js`
- Check CORS configuration
- Review network tab

### Swiper Not Working
```bash
npm install swiper
```

### Styling Not Applied
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Next Steps

1. **Enhance Authentication:**
   - Add login/signup pages
   - Implement JWT tokens
   - Add protected routes

2. **Add Payment Integration:**
   - Razorpay/Stripe
   - Payment confirmation
   - Invoice generation

3. **Improve Features:**
   - Search and filters
   - Favorites system
   - Reviews and ratings
   - Push notifications

4. **Performance:**
   - Code splitting
   - Lazy loading routes
   - Image optimization
   - Caching strategy

## Support & Resources

- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Swiper: https://swiperjs.com
- Axios: https://axios-http.com
- React Router: https://reactrouter.com

## Version Info

- React: 19.2.0
- React Router: 7.9.6
- Tailwind CSS: 3.4.18
- Swiper: Latest
- Axios: 1.13.2

---

**Last Updated:** December 1, 2025

**For Questions:** Contact development team
