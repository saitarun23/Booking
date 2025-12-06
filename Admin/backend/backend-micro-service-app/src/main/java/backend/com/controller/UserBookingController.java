package backend.com.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import backend.com.dto.BookingRequestDTO;
import backend.com.dto.BookingResponseDTO;
import backend.com.service.BookingService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("user")
@CrossOrigin
@RequiredArgsConstructor
public class UserBookingController {

    private final BookingService bookingService;

    // Book a slot
    @PostMapping("/book")
    public ResponseEntity<BookingResponseDTO> bookSlot(@Validated @RequestBody BookingRequestDTO req) {
        BookingResponseDTO resp = bookingService.bookSlot(req);
        return ResponseEntity.ok(resp);
    }

    // Get bookings by user email
    @GetMapping("/mybookings/{email}")
    public ResponseEntity<List<BookingResponseDTO>> myBookings(@PathVariable String email) {
        return ResponseEntity.ok(bookingService.getBookingsByEmail(email));
    }

    // Cancel a booking
    @PostMapping("/cancel/{bookingId}")
    public ResponseEntity<String> cancelBooking(@PathVariable Integer bookingId) {
        bookingService.cancelBooking(bookingId);
        return ResponseEntity.ok("Cancelled");
    }
}
