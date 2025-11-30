package backend.com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "services")
@Data
public class SubService {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name="service_name", nullable = false, length = 100)
	private String serviceName;
	
	@Column(name = "service_description", columnDefinition="TEXT")
	private String serviceDescription;
	
	@Lob
	@Column(name="service_image", columnDefinition = "LONGTEXT")
	private String image;
	
	@ManyToOne
	@JoinColumn(name="category_id", nullable=false)
	private Category category;
}
