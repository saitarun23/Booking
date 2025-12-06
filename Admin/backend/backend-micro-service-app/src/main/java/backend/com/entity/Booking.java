package backend.com.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bookings")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;

    @Column(name = "user_email", nullable = false, length = 150)
    private String userEmail;

    @Column(name = "booked_at")
    private LocalDateTime bookedAt = LocalDateTime.now();

    @Column(name = "booking_status", length = 50)
    private String bookingStatus = "CONFIRMED"; // CONFIRMED / CANCELLED

    @Column(name = "payment_status", length = 50)
    private String paymentStatus = "PENDING"; // PENDING / PAID / FAILED
}
