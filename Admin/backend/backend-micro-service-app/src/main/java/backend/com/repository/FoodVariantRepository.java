package backend.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.FoodVariant;

@Repository
public interface FoodVariantRepository extends JpaRepository<FoodVariant, Integer> {

	List<FoodVariant> findByFoodItem_foodItemId(int foodItemId);
}
