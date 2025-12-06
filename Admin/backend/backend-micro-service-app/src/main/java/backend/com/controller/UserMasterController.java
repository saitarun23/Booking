package backend.com.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import backend.com.entity.Category;
import backend.com.entity.SubService;
import backend.com.entity.Venue;
import backend.com.entity.Spot;
import backend.com.entity.Slot;
import backend.com.repository.CategoryRepository;
import backend.com.repository.SubServiceRepository;
import backend.com.repository.VenueRepository;
import backend.com.repository.SpotRepository;
import backend.com.repository.SlotRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3001")
@RequiredArgsConstructor
public class UserMasterController {

    private final CategoryRepository categoryRepo;
    private final SubServiceRepository subServiceRepo;
    private final VenueRepository venueRepo;
    private final SpotRepository spotRepo;
    private final SlotRepository slotRepo;

    // 1. GET all categories
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    // 2. Get all services inside one category
    @GetMapping("/subservices/{categoryId}")
    public List<SubService> getSubServices(@PathVariable int categoryId) {
        return subServiceRepo.findByCategory_CategoryId(categoryId);
    }

    // 3. Get all venues inside service
    @GetMapping("/venues/{serviceId}")
    public List<Venue> getVenues(@PathVariable int serviceId) {
        return venueRepo.findBySubservice_ServiceId(serviceId);
    }

    // 4. Get spots inside venue
    @GetMapping("/spots/{venueId}")
    public List<Spot> getSpots(@PathVariable int venueId) {
        return spotRepo.findByVenue_VenueId(venueId);
    }

    // 5. Get available slots by spot + date
    @GetMapping("/slots/{spotId}")
    public List<Slot> getSlots(@PathVariable int spotId, @RequestParam String date) {
        LocalDate d = LocalDate.parse(date);
        return slotRepo.findBySpot_SpotIdAndSlotDate(spotId, d);
    }
}
