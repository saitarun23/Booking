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
    @Column(name = "fooditem_id")
    private int foodItemId;

    @Column(name = "fooditem_name", nullable = false, length = 150)
    private String foodItemName;

    @Column(name = "fooditem_description", columnDefinition = "TEXT")
    private String foodItemDescription;

	@Lob
	@Column(name="fooditem_image", columnDefinition = "LONGTEXT")
	private String image;

    @Column(name = "available")
    private boolean available = true;

    @ManyToOne
    @JoinColumn(name="foodmenu_id",nullable = false)
    private FoodMenu foodMenu;
}