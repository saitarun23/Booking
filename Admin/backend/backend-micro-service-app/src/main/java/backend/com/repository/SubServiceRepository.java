package backend.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.SubService;

@Repository
public interface SubServiceRepository extends JpaRepository<SubService, Integer>{
	
	List<SubService> findByCategoryCategoryId(int categoryId);
	List<SubService> findByCategory_CategoryId(int categoryId);

}
