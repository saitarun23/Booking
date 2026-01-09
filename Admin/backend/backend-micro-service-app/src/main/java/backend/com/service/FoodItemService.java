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

		Optional<FoodItem> result = foodItemRepository.findById(foodItem.getFoodId());

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

	public FoodItem findFoodItemById(int foodId) {

		Optional<FoodItem> result = foodItemRepository.findById(foodId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateFoodItem(FoodItem foodItem) {

		Optional<FoodItem> result = foodItemRepository.findById(foodItem.getFoodId());

		if (result.isPresent()) {
			FoodItem fi = result.get();
			fi.setFoodName(foodItem.getFoodName());
			fi.setFoodDescription(foodItem.getFoodDescription());
			fi.setFoodQuantityRegular(foodItem.getFoodQuantityRegular());
			fi.setFoodQuantityLarge(foodItem.getFoodQuantityLarge());
			fi.setFoodPriceRegular(foodItem.getFoodPriceRegular());
			fi.setFoodPriceLarge(foodItem.getFoodPriceLarge());
			fi.setAvailable(foodItem.isAvailable());
			fi.setImage(foodItem.getImage());
			fi.setSubService(foodItem.getSubService());
			foodItemRepository.saveAndFlush(fi);
			return "FoodItem Updated Successfully";
		} else {
			return "FoodItem Record Not Present";
		}
	}

	public String deleteFoodItem(int foodId) {

		Optional<FoodItem> result = foodItemRepository.findById(foodId);

		if (result.isPresent()) {
			foodItemRepository.deleteById(foodId);
			return "FoodItem Deleted Successfully";
		} else {
			return "FoodItem Record Not Present";
		}
	}

}
