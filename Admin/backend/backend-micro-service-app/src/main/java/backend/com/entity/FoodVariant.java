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
@Table(name = "food_variants")
@Data
public class FoodVariant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "foodvariant_id")
	private int foodVariantId;

	@Column(name = "foodvariant_size", nullable = false, length = 150)
	private String foodVariantSize;

	@Column(name = "foodvariant_quantity", nullable = false)
	private String foodVariantQuantity;

	@Column(name = "foodvariant_price", nullable = false)
	private Double foodVariantPrice;

	@Column(name = "boneless", nullable = true)
    private Boolean boneless;

	@ManyToOne
	@JoinColumn(name = "fooditem_id", nullable = false)
	private FoodItem foodItem;
}
