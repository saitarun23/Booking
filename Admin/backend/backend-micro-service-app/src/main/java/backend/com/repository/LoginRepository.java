package backend.com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String>{

}
