package backend.com.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import backend.com.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserEmailOrderByBookedAtDesc(String userEmail);
}
