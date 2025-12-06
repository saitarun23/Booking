# PLAYO-LITE - Sports Booking Frontend

A modern, responsive React-based web application for booking sports venues, courts, and slots. Built with React, Tailwind CSS, Swiper, and Axios.

## Features

✨ **Key Features:**
- 🏟️ Browse sports categories and services
- 🏠 Explore venues with detailed information
- 📍 View available spots/courts at each venue
- 📅 Check slot availability by date
- 🛒 Shopping cart functionality
- 💳 Easy booking confirmation
- 📋 View your booking history
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🖼️ Image carousel with Swiper

## Tech Stack

- **Frontend Framework:** React 19.2
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 7.9
- **HTTP Client:** Axios 1.13
- **Image Carousel:** Swiper
- **Icons:** Heroicons

## Project Structure

```
src/
├── api/
│   └── userApi.js              # API integration with axios
├── components/
│   ├── Navbar.js               # Navigation bar
│   ├── Card.js                 # Reusable card component
│   ├── HeroCarousel.js         # Image carousel
│   ├── BookingCard.js          # Booking form
│   └── Cart.js                 # Shopping cart
├── pages/
│   ├── Categories.js           # Browse sports categories
│   ├── SubServices.js          # View services under category
│   ├── Venues.js               # Browse venues
│   ├── Spots.js                # View venue spots
│   ├── Slots.js                # View available time slots
│   ├── BookSlot.js             # Confirm booking
│   ├── MyBookings.js           # View your bookings
│   └── VenueDetails.js         # Detailed venue view
├── App.js                       # Main app component & routing
└── index.js                     # Entry point
```

## Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd user-frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Install additional packages (if not already installed):**
```bash
npm install swiper
```

4. **Create a `.env` file (optional):**
```bash
REACT_APP_API_BASE_URL=http://localhost:8181/user
```

## Running the Application

### Development Mode
```bash
npm start
```
Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm build
```
Creates a production build in the `build` folder.

### Run Tests
```bash
npm test
```

## API Configuration

The API base URL is configured in `src/api/userApi.js`:

```javascript
const API = axios.create({
  baseURL: "http://localhost:8181/user",
  headers: {
    "Content-Type": "application/json",
  },
});
```

Update this URL if your backend server is on a different port or domain.

## Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Categories | Browse sports categories |
| `/category/:id` | SubServices | View services under category |
| `/service/:id` | Venues | Browse venues |
| `/venue/:id` | VenueDetails | Detailed venue information |
| `/spot/:id` | Slots | View available slots |
| `/book/:slotId` | BookSlot | Confirm booking |
| `/mybookings` | MyBookings | View your bookings |

## Component Details

### Navbar
- Fixed sticky navigation
- Links to My Bookings and Cart
- Login/Signup button placeholder

### HeroCarousel
- Auto-rotating image carousel
- Navigation arrows and pagination
- Fallback to placeholder images

### BookingCard
- Date picker (minimum today's date)
- Slot selection with availability status
- Duration adjustment
- Court selection
- Price preview
- Add to cart functionality

### Cart
- Display all selected bookings
- Price calculation with tax
- Item removal
- Checkout button

### Categories/SubServices/Venues
- Grid layout with cards
- Loading and error states
- Responsive design
- Click navigation

### Slots Page
- Date picker for filtering
- Slot list with availability
- Time and price information
- Direct booking option

### MyBookings
- Email-based booking search
- Booking status indicators
- Payment status display
- Color-coded status badges

## Styling

The application uses **Tailwind CSS** for all styling. Key color scheme:
- **Primary:** Green (#16a34a)
- **Secondary:** Gray (various shades)
- **Success:** Green
- **Error:** Red
- **Warning:** Yellow

## Features in Detail

### 1. **Category Browsing**
   - View all sports categories
   - Click to explore services

### 2. **Venue Selection**
   - Browse venues offering specific sports
   - View venue information
   - Multiple spots per venue

### 3. **Slot Management**
   - Filter by date
   - Real-time availability status
   - Price per slot
   - Time-based filtering

### 4. **Booking Process**
   - Select multiple bookings
   - Add to shopping cart
   - Review cart before checkout
   - Confirm booking with email

### 5. **Booking History**
   - Search bookings by email
   - View booking status
   - Check payment status
   - Cancel pending bookings

## Error Handling

- API errors are caught and displayed to users
- Loading states prevent duplicate requests
- Validation on form inputs
- User-friendly error messages

## Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Hamburger menu ready (can be added)
- Optimized for all screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Image optimization with lazy loading
- Carousel autoplay
- Debounced API calls
- Optimized re-renders

## Environment Variables

```
REACT_APP_API_BASE_URL=http://localhost:8181/user
```

## Troubleshooting

### "Cannot GET /venue/:id"
- Make sure backend is running on `http://localhost:8181`
- Check API endpoint in `userApi.js`

### Swiper not working
- Run `npm install swiper`
- Import CSS files: `import "swiper/css"`

### Styling issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Rebuild Tailwind: `npm start`

## Future Enhancements

- [ ] User authentication (OAuth)
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Booking cancellation with refund
- [ ] User profile management
- [ ] Reviews and ratings
- [ ] Favorite venues
- [ ] Search and filters
- [ ] Push notifications
- [ ] Booking reminder emails

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@playolite.com or create an issue in the repository.

## Development Tips

1. **Hot Reload:** React automatically reloads on code changes
2. **DevTools:** Use React Developer Tools browser extension
3. **Network Debugging:** Open Network tab in DevTools to monitor API calls
4. **Console Logs:** Check browser console for debugging information

## Performance Optimization

- Images are lazy loaded via Swiper
- Components are optimized with proper re-render prevention
- API calls are cached where applicable
- Bundle size is minimized in production build

## Changelog

### v1.0.0 (Initial Release)
- Complete venue booking system
- Shopping cart functionality
- Booking history
- Responsive design
- Modern UI with Tailwind CSS


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
