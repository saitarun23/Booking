package backend.com.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.com.entity.SubServiceImage;

@Repository
public interface SubServiceImageRepository extends JpaRepository<SubServiceImage, Integer> {
    
    // Find all images associated with a specific SubService ID
    List<SubServiceImage> findBySubServiceServiceId(int serviceId);
}