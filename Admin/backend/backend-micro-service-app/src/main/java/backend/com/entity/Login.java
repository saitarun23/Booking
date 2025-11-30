package backend.com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Login {

	@Id
	private String emailid;
	private String password;
}
