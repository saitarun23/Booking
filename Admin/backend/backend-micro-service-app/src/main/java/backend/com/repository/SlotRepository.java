package backend.com.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.com.entity.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer>{

	List<Slot> findBySpotSpotId(int spotId);
	List<Slot> findBySpot_SpotIdAndSlotDate(int spotId, LocalDate date);

}
