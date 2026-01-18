package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.FoodVariant;
import backend.com.repository.FoodVariantRepository;

@Service
public class FoodVariantService {

	@Autowired
	private FoodVariantRepository foodVariantRepository;

	public String addFoodVariantService(FoodVariant foodVariant) {

		Optional<FoodVariant> result = foodVariantRepository.findById(foodVariant.getFoodVariantId());

		if (result.isPresent()) {
			return "FoodVariant Id Must Be Unique";
		} else {
			foodVariantRepository.save(foodVariant);
			return "FoodVariant Stored Successfully";
		}
	}

	public List<FoodVariant> findAllFoodVariants() {
		return foodVariantRepository.findAll();
	}

	public FoodVariant findFoodVariantById(int foodVariantId) {

		Optional<FoodVariant> result = foodVariantRepository.findById(foodVariantId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateFoodVariant(FoodVariant foodVariant) {
		Optional<FoodVariant> result = foodVariantRepository.findById(foodVariant.getFoodVariantId());

		if (result.isPresent()) {
			FoodVariant fv = result.get();
			if (foodVariant.getFoodVariantSize() != null) {
				fv.setFoodVariantSize(foodVariant.getFoodVariantSize());
			}

			if (foodVariant.getFoodVariantQuantity() != null) {
				fv.setFoodVariantQuantity(foodVariant.getFoodVariantQuantity());
			}

			if (foodVariant.getFoodVariantPrice() != null) {
				fv.setFoodVariantPrice(foodVariant.getFoodVariantPrice());
			}
			
			if (foodVariant.getBoneless() != null) {
				fv.setBoneless(foodVariant.getBoneless());
			}
			
			fv.setFoodItem(foodVariant.getFoodItem());
			foodVariantRepository.saveAndFlush(fv);
			return "Food Variant updated successfully";
		} else {
			return "Food Variant record not present";
		}
	}

	public String deleteFoodVariant(int foodVariantId) {
		Optional<FoodVariant> result = foodVariantRepository.findById(foodVariantId);

		if (result.isPresent()) {
			foodVariantRepository.deleteById(foodVariantId);
			return "Food Variant Deleted Successfully";
		} else {
			return "Food Variant Record Not Present";
		}

	}
}