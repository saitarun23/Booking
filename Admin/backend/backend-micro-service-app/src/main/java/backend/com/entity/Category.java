package backend.com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="categories")
@Data
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="category_id")
	private int categoryId;
	
	@Column(name="category_name", nullable=false, length=100)
	private String categoryName;
	
	@Column(name="category_description", columnDefinition="TEXT")
	private String categoryDescription;
	
	@Lob
	@Column(name="image", columnDefinition = "LONGTEXT")
	private String image;
}
