package backend.com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "food_items")
@Data
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private int foodId;

    @Column(name = "food_name", nullable = false, length = 150)
    private String foodName;

    @Column(name = "food_description", columnDefinition = "TEXT")
    private String foodDescription;

    @Column(name = "foodquantity_regular", nullable = false)
    private String foodQuantityRegular;
    
    @Column(name = "foodquantity_large", nullable = false)
    private String foodQuantityLarge;
    
    @Column(name = "foodprice_regular", nullable = false)
    private Double foodPriceRegular;
    
    @Column(name = "foodprice_large", nullable = false)
    private Double foodPriceLarge;
    
	@Lob
	@Column(name="fooditem_image", columnDefinition = "LONGTEXT")
	private String image;

    @Column(name = "available")
    private boolean available = true;

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private SubService subService;
}
