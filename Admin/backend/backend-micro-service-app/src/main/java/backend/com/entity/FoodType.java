package backend.com.entity;

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
@Table(name = "food_types")
@Data
public class FoodType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "foodtype_id")
	private int foodTypeId;

	@Column(name = "foodtype_name", nullable = false, length = 100)
	private String foodTypeName;

	@ManyToOne
	@JoinColumn(name = "service_id", nullable = false)
	private SubService subService;
}
