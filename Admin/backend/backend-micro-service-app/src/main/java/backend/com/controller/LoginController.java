package backend.com.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import backend.com.entity.Login;
import backend.com.service.LoginService;


@RestController
@RequestMapping("login")			// http://localhost:8181/login 
@CrossOrigin
public class LoginController {

	@Autowired
	LoginService loginService;
	
	@PostMapping(value="signin", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signIn(@RequestBody Login login) {
		return loginService.SignIn(login);
	}
	
	@PostMapping(value="signup", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String signUp(@RequestBody Login login) {
		return loginService.SignUp(login);
	}
	
}
