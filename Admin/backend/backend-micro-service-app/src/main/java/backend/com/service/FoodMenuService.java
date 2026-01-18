package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.FoodMenu;
import backend.com.repository.FoodMenuRepository;

@Service
public class FoodMenuService {

	@Autowired
	FoodMenuRepository foodMenuRepository;
	
	public String addFoodMenuService(FoodMenu foodMenu) {

		Optional<FoodMenu> result = foodMenuRepository.findById(foodMenu.getFoodMenuId());

		if (result.isPresent()) {
			return "FoodMenu id must be unique";
		} else {
			foodMenuRepository.save(foodMenu);
			return "FoodMenu stored successfully";
		}
	}
	
	public List<FoodMenu> findAllFoodMenu(){
		return foodMenuRepository.findAll();
	}
	
	public FoodMenu findFoodMenuById(int foodMenuId) {
		Optional<FoodMenu> result = foodMenuRepository.findById(foodMenuId);
		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}
	
	public String updateFoodMenu(FoodMenu foodMenu) {
		Optional<FoodMenu> result = foodMenuRepository.findById(foodMenu.getFoodMenuId());

		if (result.isPresent()) {
			FoodMenu fm = result.get();
			fm.setFoodMenuName(foodMenu.getFoodMenuName());
			fm.setFoodType(foodMenu.getFoodType());
			foodMenuRepository.saveAndFlush(fm);
			return "FoodMenu Stored Successfully";
		} else {
			return "FoodMenu Record Not Present";
		}
	}
	
	public String deleteFoodMenu(int foodMenuId) {
		Optional<FoodMenu> result = foodMenuRepository.findById(foodMenuId);
		if (result.isPresent()) {
			foodMenuRepository.deleteById(foodMenuId);
			return "FoodMenu Deleted Successfully";
		} else {
			return "Record Not Present";
		}
	}
}
