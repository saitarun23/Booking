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

import backend.com.entity.FoodType;
import backend.com.service.FoodTypeService;

@RestController
@RequestMapping("foodtype")
public class FoodTypeController {

	@Autowired
	FoodTypeService foodTypeService;
	
	@PostMapping(value="add_foodtype")
	public String addFoodTypeService(@RequestBody FoodType foodType) {
		return foodTypeService.addFoodTypeService(foodType);
	}
	
	@GetMapping(value="findAll_foodtype")
	public List<FoodType> getAllFoodType(){
		return foodTypeService.findAllFoodType();
	}
	
	@GetMapping(value="find_foodtype_byid/{foodtypeid}")
	public FoodType getById(@PathVariable("foodtypeid") int foodtypeid) {
		return foodTypeService.findFoodTypeById(foodtypeid);
	}
	
	@PutMapping(value = "update_foodtype")
	public String updateFoodType(@RequestBody FoodType foodType) {
		return foodTypeService.updateFoodType(foodType);
	}
	
	@DeleteMapping(value = "delete_foodtype/{foodtypeid}")
	public String deleteFoodType(@PathVariable("foodtypeid") int foodtypeid) {
		return foodTypeService.deleteFoodType(foodtypeid);
	}
}
