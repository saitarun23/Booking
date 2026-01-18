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
@Table(name="food_menu")
@Data
public class FoodMenu {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "foodmenu_id")
	private int foodMenuId;
	
	@Column(name = "foodmenu_name", nullable = false, length = 100)
	private String foodMenuName;
	
	@ManyToOne
	@JoinColumn(name="foodtype_id", nullable = false)
	private FoodType foodType;
}
