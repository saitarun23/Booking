package backend.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.FoodType;

@Repository
public interface FoodTypeRepository extends JpaRepository<FoodType, Integer>{

	List<FoodType> findBySubService_ServiceId(int serviceId);
}
