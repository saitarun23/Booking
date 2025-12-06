package backend.com.dto;

import lombok.Data;

@Data
public class BookingRequestDTO {
    
    private int slotId;
    private String userEmail;
}
