package backend.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.FoodItem;


@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Integer>{

//	List<FoodItem> findBySubserviceServiceId(int serviceId);
//	List<FoodItem> findBySubservice_ServiceId(int serviceId);
	List<FoodItem> findBySubService_ServiceId(int serviceId);
}
