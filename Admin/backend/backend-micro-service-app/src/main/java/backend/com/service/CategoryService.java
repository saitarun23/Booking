package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.Category;
import backend.com.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public String addCategory(Category category) {
		Optional<Category> result=categoryRepository.findById(category.getCategoryId());
		
		if(result.isPresent()) {
			return "CategoryId must be Unique";
		}else {
			categoryRepository.save(category);
			return "Category Stored Successfully";
		}
	}
	
	
	public List<Category> findAllCategory(){
		return categoryRepository.findAll();
	}
	
	public Category findCategoryById(int CategoryId) {
		Optional<Category> result=categoryRepository.findById(CategoryId);
		
		if(result.isPresent()) {
			Category c=result.get();
			return c;
		}else {
			return null;
		}	
	}
	
	public String updateCategory(Category category) {
		Optional<Category> result=categoryRepository.findById(category.getCategoryId());
		
		if(result.isPresent()) {
			Category c=result.get();
			c.setCategoryName(category.getCategoryName());
			c.setCategoryDescription(category.getCategoryDescription());
			c.setImage(category.getImage());
			categoryRepository.saveAndFlush(c);
			return "Category Information Updated Successfully";
		}else {
			return "Category Record Not Present";
		}
	}
	
	public String deleteCategory(int CategoryId) {
		Optional<Category> result=categoryRepository.findById(CategoryId);
		
		if(result.isPresent()) {
			categoryRepository.deleteById(CategoryId);
			return "Category Record Delete Successfully";
		}else {
			return "Category Record Not Present";
		}
	}
}
