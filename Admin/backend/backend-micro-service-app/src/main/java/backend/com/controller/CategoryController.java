package backend.com.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.com.entity.Category;
import backend.com.service.CategoryService;

@RestController
@RequestMapping("category")			// http://localhost:8181/category/*
@CrossOrigin
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@PostMapping(value = "add_category")
	public String addCategory(@RequestBody Category category) {
		return categoryService.addCategory(category);
	}
		
	@GetMapping(value = "findAll_category")
	public List<Category> findAllCategory(){
		return categoryService.findAllCategory();
	}
	
	@GetMapping(value="find_category_byid/{categoryid}")
	public Category findCategoryById(@PathVariable("categoryid") int categoryid) {
		return categoryService.findCategoryById(categoryid);
	}
	
	@PutMapping(value = "update_category")
    public String updateCategory(@RequestBody Category category) {
        return categoryService.updateCategory(category);
    }
	
	@DeleteMapping(value="delete_category/{categoryid}")
	public String deleteCategory(@PathVariable("categoryid") int categoryid) {
		return categoryService.deleteCategory(categoryid);
	}
}
