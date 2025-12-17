package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.Slot;
import backend.com.repository.SlotRepository;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    // ---------------- ADD SLOT (ADMIN) ------------------
    public String addSlot(Slot slot) {

        // 1. Slot ID must not be manually passed
        if (slot.getSlotId() != 0) {
            return "Slot ID must not be passed manually. Auto-generated.";
        }

        // 2. Date validation
        if (slot.getSlotStartDate().isAfter(slot.getSlotEndDate())) {
            return "Slot start date must be before end date.";
        }

        // 3. Time validation
        if (slot.getSlotStartTime().isAfter(slot.getSlotEndTime())) {
            return "Slot start time must be before end time.";
        }

        // 4. Prevent overlapping slots (same spot)
        boolean overlap = slotRepository.existsOverlappingSlot(
                slot.getSpot().getSpotId(),
                slot.getSlotStartTime(),
                slot.getSlotEndTime()
        );

        if (overlap) {
            return "Slot overlaps with an existing slot.";
        }

        slotRepository.save(slot);
        return "Slot Stored Successfully";
    }


    // ---------------- UPDATE SLOT (ADMIN) ------------------
    public String updateSlot(Slot slot) {

        Optional<Slot> existing = slotRepository.findById(slot.getSlotId());
        if (existing.isEmpty()) {
            return "Slot not found";
        }

        // Same validations as add
        if (slot.getSlotStartDate().isAfter(slot.getSlotEndDate())) {
            return "Slot start date must be before end date.";
        }

        if (slot.getSlotStartTime().isAfter(slot.getSlotEndTime())) {
            return "Slot start time must be before end time.";
        }

        boolean overlap = slotRepository.existsOverlappingSlot(
                slot.getSpot().getSpotId(),
                slot.getSlotStartTime(),
                slot.getSlotEndTime()
        );

        if (overlap) {
            return "Updated slot overlaps with another slot.";
        }

        slotRepository.save(slot);
        return "Slot Updated Successfully";
    }


    // ---------------- DELETE SLOT (ADMIN) ------------------
    public String deleteSlot(int slotId) {
        Optional<Slot> slot = slotRepository.findById(slotId);
        if (slot.isEmpty()) {
            return "Slot Not Found";
        }

        slotRepository.deleteById(slotId);
        return "Slot Deleted Successfully";
    }


    // ---------------- GET ALL SLOTS ------------------
    public List<Slot> findAllSlots() {
        return slotRepository.findAll();
    }


    // ---------------- GET SLOT BY ID ------------------
    public Slot findSlotById(int slotId) {
        return slotRepository.findById(slotId).orElse(null);
    }
}
