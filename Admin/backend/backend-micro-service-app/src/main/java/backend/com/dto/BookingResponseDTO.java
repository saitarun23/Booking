package backend.com.dto;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BookingResponseDTO {
    private int bookingId;
    private int slotId;
    private String userEmail;
    private LocalDateTime bookedAt;
    private String bookingStatus;
    private String paymentStatus;
}
