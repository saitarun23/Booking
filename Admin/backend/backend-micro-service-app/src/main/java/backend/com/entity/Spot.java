package backend.com.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "spots")
@Data
public class Spot {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "spot_id")
	private int spotId;

	@Column(name = "spot_name", nullable = false, length = 150)
	private String spotName;

	@Column(name = "spot_capacity")
	private int spotCapacity;

	@Column(name = "spot_price_per_hour", columnDefinition = "DECIMAL(10,2)")
	private Double spotPricePerHour;

	@ManyToOne
	@JoinColumn(name = "venue_id", nullable = false)
	private Venue venue;
	
	// One Spot has Many Images
    @OneToMany(mappedBy = "spot", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference // Handles JSON recursion
    private List<SpotImage> images;

}
