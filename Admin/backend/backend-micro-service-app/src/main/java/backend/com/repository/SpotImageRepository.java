package backend.com.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import backend.com.entity.SpotImage;

@Repository
public interface SpotImageRepository extends JpaRepository<SpotImage, Integer> {
    // Find all images for a specific spot
    List<SpotImage> findBySpot_SpotId(int spotId);
}