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

import backend.com.entity.FoodMenu;
import backend.com.service.FoodMenuService;

@RestController
@RequestMapping("foodmenu")
public class FoodMenuController {

	@Autowired
	FoodMenuService foodMenuService;
	
	@PostMapping(value="add_foodmenu")
	public String addFoodMenuService(@RequestBody FoodMenu foodMenu) {
		return foodMenuService.addFoodMenuService(foodMenu);
	}
	
	@GetMapping(value="findAll_foodmenu")
	public List<FoodMenu> getAllFoodMenu(){
		return foodMenuService.findAllFoodMenu();
	}
	
	@GetMapping(value="find_foodmenu_byid/{foodmenuid}")
	public FoodMenu getById(@PathVariable("foodmenuid") int foodmenuid) {
		return foodMenuService.findFoodMenuById(foodmenuid);
	}
	
	@PutMapping(value = "update_foodmenu")
	public String updateFoodMenu(@RequestBody FoodMenu foodMenu) {
		return foodMenuService.updateFoodMenu(foodMenu);
	}
	
	@DeleteMapping(value = "delete_foodmenu/{foodmenuid}")
	public String deleteFoodMenu(@PathVariable("foodmenuid") int foodmenuid) {
		return foodMenuService.deleteFoodMenu(foodmenuid);
	}
}
