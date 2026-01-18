package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.FoodType;
import backend.com.repository.FoodTypeRepository;

@Service
public class FoodTypeService {

	@Autowired
	FoodTypeRepository foodTypeRepository;

	public String addFoodTypeService(FoodType foodType) {

		Optional<FoodType> result = foodTypeRepository.findById(foodType.getFoodTypeId());

		if (result.isPresent()) {
			return "FoodType id must be unique";
		} else {
			foodTypeRepository.save(foodType);
			return "FoodType stored successfully";
		}
	}

	public List<FoodType> findAllFoodType() {
		return foodTypeRepository.findAll();
	}

	public FoodType findFoodTypeById(int foodTypeId) {
		Optional<FoodType> result = foodTypeRepository.findById(foodTypeId);
		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateFoodType(FoodType foodType) {
		Optional<FoodType> result = foodTypeRepository.findById(foodType.getFoodTypeId());

		if (result.isPresent()) {
			FoodType ft = result.get();
			ft.setFoodTypeName(foodType.getFoodTypeName());
			ft.setSubService(foodType.getSubService());
			foodTypeRepository.saveAndFlush(ft);
			return "FoodType Stored Successfully";
		} else {
			return "FoodType Record Not Present";
		}
	}

	public String deleteFoodType(int foodTypeId) {
		Optional<FoodType> result = foodTypeRepository.findById(foodTypeId);
		if (result.isPresent()) {
			foodTypeRepository.deleteById(foodTypeId);
			return "FoodType Deleted Successfully";
		} else {
			return "Record Not Present";
		}
	}
}
