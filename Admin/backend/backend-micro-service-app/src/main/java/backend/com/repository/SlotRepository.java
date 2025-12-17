
package backend.com.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.com.entity.Slot;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Integer> {

	List<Slot> findBySpotSpotId(int spotId);

	//List<Slot> findBySpot_SpotIdAndSlotStartDate(int spotId, LocalDate date);
	
	 @Query("""
		        SELECT s FROM Slot s
		        WHERE s.spot.spotId = :spotId
		        AND :date BETWEEN s.slotStartDate AND s.slotEndDate
		        AND s.slotActive = true
		    """)
		    List<Slot> findAvailableSlotsForDate(
		        @Param("spotId") int spotId,
		        @Param("date") LocalDate date
		    );

	// Check overlapping time for same Spot
	@Query("""
			    SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
			    FROM Slot s
			    WHERE s.spot.spotId = :spotId
			    AND (
			           (s.slotStartTime < :endTime)
			       AND (s.slotEndTime > :startTime)
			    )
			""")
	boolean existsOverlappingSlot(@Param("spotId") int spotId, @Param("startTime") LocalDateTime startTime,
			@Param("endTime") LocalDateTime endTime);

}
