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

import backend.com.entity.FoodVariant;
import backend.com.service.FoodVariantService;

@RestController
@RequestMapping("foodvariant")
public class FoodVariantController {

	@Autowired
	FoodVariantService foodVariantService;

	@PostMapping(value = "add_foodvariant")
	public String addFoodVariantService(@RequestBody FoodVariant foodVariant) {
		return foodVariantService.addFoodVariantService(foodVariant);
	}

	@GetMapping(value = "findAll_foodvariant")
	public List<FoodVariant> getAllFoodVariants() {
		return foodVariantService.findAllFoodVariants();
	}

	@GetMapping(value = "find_foodvariant_byid/{foodvariantid}")
	public FoodVariant getById(@PathVariable("foodvariantid") int foodvariantid) {
		return foodVariantService.findFoodVariantById(foodvariantid);
	}

	@PutMapping(value = "update_foodvariant")
	public String updateFoodVariant(@RequestBody FoodVariant foodVariant) {
		return foodVariantService.updateFoodVariant(foodVariant);
	}

	@DeleteMapping(value = "delete_foodvariant/{foodvariantid}")
	public String deleteFoodVariant(@PathVariable("foodvariantid") int foodvariantid) {
		return foodVariantService.deleteFoodVariant(foodvariantid);
	}
}