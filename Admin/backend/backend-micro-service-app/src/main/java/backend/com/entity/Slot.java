package backend.com.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "slots")
@Data
public class Slot {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "slot_id")
	 private int slotId;

	 @Column(name = "slot_date", nullable = false)
	 private LocalDate slotDate;
	 
	 @Column(name = "slot_start_time", nullable = false)
	 private LocalDateTime slotStartTime;

	 @Column(name = "slot_end_time", nullable = false)
	 private LocalDateTime slotEndTime;

	 @Column(name = "slot_price", columnDefinition = "DECIMAL(10,2)")
	 private Double slotPrice;

	 @Column(name = "slot_active")
	 private Boolean slotActive = true;
	    
	 @ManyToOne
	 @JoinColumn(name = "spot_id", nullable = false)
	 private Spot spot;

}
