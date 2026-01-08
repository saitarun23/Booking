package backend.com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.com.entity.FoodItem;
import backend.com.service.FoodItemService;

@RestController
@RequestMapping("fooditem")
public class FoodItemController {

	@Autowired
	FoodItemService foodItemService;

	@PostMapping(value = "add_fooditem")
	public String addFoodItemService(@RequestBody FoodItem foodItem) {
		return foodItemService.addFoodItemService(foodItem);
	}

	@GetMapping(value = "findAll_fooditem")
	public List<FoodItem> getAllFoodItem() {
		return foodItemService.findAllFoodItem();
	}

	@GetMapping(value = "find_fooditem_byid/{foodid}")
	public FoodItem getById(@PathVariable("foodid") int foodid) {
		return foodItemService.findFoodItemById(foodid);
	}

	@PutMapping(value = "update_fooditem")
	public String updateFoodItem(@RequestBody FoodItem foodItem) {
		return foodItemService.updateFoodItem(foodItem);
	}

	@DeleteMapping(value = "delete_fooditem/{foodid}")
	public String deleteFoodItem(@PathVariable("foodid") int foodid) {
		return foodItemService.deleteFoodItem(foodid);
	}
}
