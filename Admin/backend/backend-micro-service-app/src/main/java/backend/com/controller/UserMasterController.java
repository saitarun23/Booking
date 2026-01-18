package backend.com.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import backend.com.entity.Category;
import backend.com.entity.FoodItem;
import backend.com.entity.FoodMenu;
import backend.com.entity.FoodType;
import backend.com.entity.FoodVariant;
import backend.com.entity.SubService;
import backend.com.entity.Venue;
import backend.com.entity.Spot;
import backend.com.entity.SpotImage;
import backend.com.entity.Slot;
import backend.com.repository.CategoryRepository;
import backend.com.repository.FoodItemRepository;
import backend.com.repository.FoodMenuRepository;
import backend.com.repository.FoodTypeRepository;
import backend.com.repository.FoodVariantRepository;
import backend.com.repository.SubServiceRepository;
import backend.com.repository.VenueRepository;
import backend.com.repository.SpotRepository;
import backend.com.repository.SlotRepository;
import backend.com.repository.SpotImageRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserMasterController {

	private final CategoryRepository categoryRepo;
	private final SubServiceRepository subServiceRepo;
	private final FoodTypeRepository foodTypeRepo;
	private final FoodMenuRepository foodMenuRepo;
	private final FoodItemRepository foodItemRepo;
	private final FoodVariantRepository foodVariantRepo;
	private final VenueRepository venueRepo;
	private final SpotRepository spotRepo;
	private final SpotImageRepository spotImageRepo;
	private final SlotRepository slotRepo;

	/* -------------------- CATEGORIES -------------------- */
	@GetMapping("/categories")
	public List<Category> getCategories() {
		return categoryRepo.findAll();
	}

	/* -------------------- SUB SERVICES -------------------- */
	@GetMapping("/subservices/{categoryId}")
	public List<SubService> getSubServices(@PathVariable int categoryId) {
		return subServiceRepo.findByCategory_CategoryId(categoryId);
	}

	/* -------------------- Food Types -------------------- */
	@GetMapping("food-types/{serviceId}")
	public List<FoodType> getFoodTypes(@PathVariable int serviceId) {
		return foodTypeRepo.findBySubService_ServiceId(serviceId);
	}

	/* -------------------- Food Menu -------------------- */
	@GetMapping("food-menus/{foodTypeId}")
	public List<FoodMenu> getFoodMenus(@PathVariable int foodTypeId) {
		return foodMenuRepo.findByFoodType_foodTypeId(foodTypeId);
	}

	/* -------------------- Food Items -------------------- */
	@GetMapping("food-items/{foodMenuId}")
	public List<FoodItem> getFoodItems(@PathVariable int foodMenuId) {
		return foodItemRepo.findByFoodMenu_foodMenuId(foodMenuId);
	}

	/* -------------------- Food Variant -------------------- */
	@GetMapping("food-variants/{foodItemId}")
	public List<FoodVariant> getFoodVariants(@PathVariable int foodItemId) {
		return foodVariantRepo.findByFoodItem_foodItemId(foodItemId);
	}

	/* -------------------- VENUES -------------------- */
	@GetMapping("/venues/{serviceId}")
	public List<Venue> getVenues(@PathVariable int serviceId) {
		return venueRepo.findBySubservice_ServiceId(serviceId);
	}

	/* -------------------- SPOTS -------------------- */
	@GetMapping("/spots/{venueId}")
	public List<Spot> getSpots(@PathVariable int venueId) {
		return spotRepo.findByVenue_VenueId(venueId);
	}

	/* -------------------- ✅ SPOT IMAGES -------------------- */
	@GetMapping("/spot-images/{spotId}")
	public List<SpotImage> getSpotImages(@PathVariable int spotId) {
		// This will return the List of SpotImage objects (including the Base64 String)
		return spotImageRepo.findBySpot_SpotId(spotId);
	}

	/* -------------------- ✅ AVAILABLE SLOTS (FIXED) -------------------- */
	@GetMapping("/slots/{spotId}")
	public List<Slot> getSlots(@PathVariable int spotId, @RequestParam String date) {
		LocalDate selectedDate = LocalDate.parse(date);

		// ✅ Correct: checks startDate → endDate
		return slotRepo.findAvailableSlotsForDate(spotId, selectedDate);
	}

	/* -------------------- CHECK CUSTOM TIME AVAILABILITY -------------------- */
	@GetMapping("/slot/check-availability")
	public Map<String, Object> checkAvailability(@RequestParam int spotId, @RequestParam String date, // yyyy-MM-dd
			@RequestParam String startTime, // HH:mm
			@RequestParam String endTime // HH:mm
	) {

		LocalDateTime start = LocalDateTime.parse(date + "T" + startTime);
		LocalDateTime end = LocalDateTime.parse(date + "T" + endTime);

		boolean exists = slotRepo.existsOverlappingSlot(spotId, start, end);

		return exists ? Map.of("available", false, "message", "This time slot is already booked")
				: Map.of("available", true, "message", "Time slot is available");
	}
}