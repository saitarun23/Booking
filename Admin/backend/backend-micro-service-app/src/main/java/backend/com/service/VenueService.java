package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.Venue;
import backend.com.repository.VenueRepository;

@Service
public class VenueService {

	@Autowired
	VenueRepository venueRepository;

	public String addVenue(Venue venue) {

		Optional<Venue> result = venueRepository.findById(venue.getVenueId());

		if (result.isPresent()) {
			return "Venue ID must be unique";
		} else {
			venueRepository.save(venue);
			return "Venue Stored Successfully";
		}
	}

	public List<Venue> findAllVenues() {
		return venueRepository.findAll();
	}

	public Venue findVenueById(int venueId) {

		Optional<Venue> result = venueRepository.findById(venueId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateVenue(Venue venue) {

		Optional<Venue> result = venueRepository.findById(venue.getVenueId());

		if (result.isPresent()) {
			Venue v = result.get();
			v.setVenueName(venue.getVenueName());
			v.setVenueAddress(venue.getVenueAddress());
			v.setVenueDescription(venue.getVenueDescription());
			v.setLatitude(venue.getLatitude());
			v.setLongitude(venue.getLongitude());
			v.setVenueAmenities(venue.getVenueAmenities());
			v.setImage(venue.getImage());
			v.setSubservice(venue.getSubservice()); // ⭐ important (FK update)
			venueRepository.saveAndFlush(v);
			return "Venue Information Updated Successfully";
		} else {
			return "Venue Record Not Present";
		}
	}

	public String deleteVenue(int venueId) {

		Optional<Venue> result = venueRepository.findById(venueId);

		if (result.isPresent()) {
			venueRepository.deleteById(venueId);
			return "Venue Deleted Successfully";
		} else {
			return "Venue Record Not Present";
		}
	}
}
