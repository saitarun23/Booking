package backend.com.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import backend.com.dto.BookingRequestDTO;
import backend.com.dto.BookingResponseDTO;
import backend.com.entity.Booking;
import backend.com.entity.Slot;
import backend.com.repository.BookingRepository;
import backend.com.repository.SlotRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;

    @Transactional
    public BookingResponseDTO bookSlot(BookingRequestDTO req) {
        Slot slot = slotRepository.findById(req.getSlotId()).orElseThrow(
            () -> new RuntimeException("Slot not found: " + req.getSlotId())
        );

        // prevent double booking (simple approach)
        if (Boolean.FALSE.equals(slot.getSlotActive())) {
            throw new RuntimeException("Slot already booked");
        }

        // mark slot inactive (booked)
        slot.setSlotActive(false);
        slotRepository.save(slot);

        Booking booking = new Booking();
        booking.setSlot(slot);
        booking.setUserEmail(req.getUserEmail());
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentStatus("PAID"); // or keep PENDING if payment not integrated

        Booking saved = bookingRepository.save(booking);
        return toDto(saved);
    }

    public List<BookingResponseDTO> getBookingsByEmail(String email) {
        return bookingRepository.findByUserEmailOrderByBookedAtDesc(email)
            .stream().map(this::toDto).collect(Collectors.toList());
    }

    public void cancelBooking(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setBookingStatus("CANCELLED");
        booking.setPaymentStatus("REFUNDED");
        bookingRepository.save(booking);

        // make slot active again (simple policy)
        Slot slot = booking.getSlot();
        slot.setSlotActive(true);
        slotRepository.save(slot);
    }

    private BookingResponseDTO toDto(Booking b) {
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setBookingId(b.getBookingId());
        dto.setSlotId(b.getSlot().getSlotId());
        dto.setUserEmail(b.getUserEmail());
        dto.setBookedAt(b.getBookedAt());
        dto.setBookingStatus(b.getBookingStatus());
        dto.setPaymentStatus(b.getPaymentStatus());
        return dto;
    }
}
