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
	SlotRepository slotRepository;

	public String addSlot(Slot slot) {

		Optional<Slot> result = slotRepository.findById(slot.getSlotId());

		if (result.isPresent()) {
			return "Slot ID must be unique";
		} else {
			slotRepository.save(slot);
			return "Slot Stored Successfully";
		}
	}

	public List<Slot> findAllSlots() {
		return slotRepository.findAll();
	}

	public Slot findSlotById(int slotId) {

		Optional<Slot> result = slotRepository.findById(slotId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateSlot(Slot slot) {

		Optional<Slot> result = slotRepository.findById(slot.getSlotId());

		if (result.isPresent()) {
			Slot s = result.get();
			s.setSlotDate(slot.getSlotDate());
			s.setSlotStartTime(slot.getSlotStartTime());
			s.setSlotEndTime(slot.getSlotEndTime());
			s.setSlotPrice(slot.getSlotPrice());
			s.setSlotActive(slot.getSlotActive());
			s.setSpot(slot.getSpot()); // FK update
			slotRepository.saveAndFlush(s);
			return "Slot Updated Successfully";
		} else {
			return "Slot Record Not Present";
		}
	}

	public String deleteSlot(int slotId) {

		Optional<Slot> result = slotRepository.findById(slotId);

		if (result.isPresent()) {
			slotRepository.deleteById(slotId);
			return "Slot Deleted Successfully";
		} else {
			return "Slot Record Not Present";
		}
	}
}
