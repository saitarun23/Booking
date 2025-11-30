package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.Spot;
import backend.com.repository.SpotRepository;

@Service
public class SpotService {

	@Autowired
	SpotRepository spotRepository;
	
	public String addSpot(Spot spot) {

        Optional<Spot> result = spotRepository.findById(spot.getSpotId());

        if (result.isPresent()) {
            return "Spot ID must be unique";
        } else {
            spotRepository.save(spot);
            return "Spot Stored Successfully";
        }
    }

    public List<Spot> findAllSpots() {
        return spotRepository.findAll();
    }

    public Spot findSpotById(int spotId) {

        Optional<Spot> result = spotRepository.findById(spotId);

        if (result.isPresent()) {
            return result.get();
        } else {
            return null;
        }
    }

    public String updateSpot(Spot spot) {

        Optional<Spot> result = spotRepository.findById(spot.getSpotId());

        if (result.isPresent()) {
            Spot s = result.get();
            s.setSpotName(spot.getSpotName());
            s.setSpotCapacity(spot.getSpotCapacity());
            s.setSpotPricePerHour(spot.getSpotPricePerHour());
            s.setVenue(spot.getVenue());  // ⭐ update venue also
            spotRepository.saveAndFlush(s);
            return "Spot Updated Successfully";
        } else {
            return "Spot Record Not Present";
        }
    }

    public String deleteSpot(int spotId) {

        Optional<Spot> result = spotRepository.findById(spotId);

        if (result.isPresent()) {
            spotRepository.deleteById(spotId);
            return "Spot Deleted Successfully";
        } else {
            return "Spot Record Not Present";
        }
    }
}
