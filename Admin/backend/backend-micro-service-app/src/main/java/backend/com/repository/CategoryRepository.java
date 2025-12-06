package backend.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
	List<Category> findAll();

}
