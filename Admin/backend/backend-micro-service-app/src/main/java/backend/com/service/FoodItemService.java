package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.FoodItem;
import backend.com.repository.FoodItemRepository;

@Service
public class FoodItemService {

	@Autowired
	FoodItemRepository foodItemRepository;

	public String addFoodItemService(FoodItem foodItem) {

		Optional<FoodItem> result = foodItemRepository.findById(foodItem.getFoodItemId());

		if (result.isPresent()) {
			return "FoodItem Id Must Be Unique";
		} else {
			foodItemRepository.save(foodItem);
			return "FoodItem Stored Successfully";
		}
	}

	public List<FoodItem> findAllFoodItem() {
		return foodItemRepository.findAll();
	}

	public FoodItem findFoodItemById(int foodItemId) {

		Optional<FoodItem> result = foodItemRepository.findById(foodItemId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateFoodItem(FoodItem foodItem) {

		Optional<FoodItem> result = foodItemRepository.findById(foodItem.getFoodItemId());

		if (result.isPresent()) {
			FoodItem fi = result.get();
			fi.setFoodItemName(foodItem.getFoodItemName());
			fi.setFoodItemDescription(foodItem.getFoodItemDescription());
			fi.setImage(foodItem.getImage());
			fi.setAvailable(foodItem.isAvailable());
			fi.setFoodMenu(foodItem.getFoodMenu());
			foodItemRepository.saveAndFlush(fi);
			return "FoodItem Updated Successfully";
		} else {
			return "FoodItem Record Not Present";
		}
	}

	public String deleteFoodItem(int foodItemId) {

		Optional<FoodItem> result = foodItemRepository.findById(foodItemId);

		if (result.isPresent()) {
			foodItemRepository.deleteById(foodItemId);
			return "FoodItem Deleted Successfully";
		} else {
			return "FoodItem Record Not Present";
		}
	}

}