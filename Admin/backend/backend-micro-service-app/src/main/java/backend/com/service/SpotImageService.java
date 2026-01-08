package backend.com.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import backend.com.entity.Spot;
import backend.com.entity.SpotImage;
import backend.com.repository.SpotImageRepository;
import backend.com.repository.SpotRepository;

@Service
public class SpotImageService {

    @Autowired
    SpotImageRepository spotImageRepository;

    @Autowired
    SpotRepository spotRepository;

    // CREATE: Upload multiple images and convert to Base64 String
    public String addImages(int spotId, MultipartFile[] files) throws IOException {
        Optional<Spot> spotResult = spotRepository.findById(spotId);

        if (spotResult.isPresent()) {
            Spot spot = spotResult.get();
            for (MultipartFile file : files) {
                SpotImage img = new SpotImage();
                // Convert file to Base64 String
                String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
                img.setImageData(base64Image);
                img.setSpot(spot);
                spotImageRepository.save(img);
            }
            return "Images added successfully for Spot ID: " + spotId;
        } else {
            return "Spot not found";
        }
    }

    // READ: Find all images by Spot ID
    public List<SpotImage> findImagesBySpotId(int spotId) {
        return spotImageRepository.findBySpot_SpotId(spotId);
    }

    // UPDATE: Update a specific image
    public String updateImage(int imageId, MultipartFile file) throws IOException {
        Optional<SpotImage> result = spotImageRepository.findById(imageId);
        if (result.isPresent()) {
            SpotImage img = result.get();
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());
            img.setImageData(base64Image);
            spotImageRepository.saveAndFlush(img);
            return "Image updated successfully";
        }
        return "Image not found";
    }

    // DELETE: Delete a specific image
    public String deleteImage(int imageId) {
        if (spotImageRepository.existsById(imageId)) {
            spotImageRepository.deleteById(imageId);
            return "Image deleted successfully";
        }
        return "Image not found";
    }
}