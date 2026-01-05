package backend.com.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import backend.com.entity.SubServiceImage;
import backend.com.entity.SubService;
import backend.com.repository.SubServiceImageRepository;
import backend.com.repository.SubServiceRepository;

@Service
public class SubServiceImageService {

    @Autowired
    private SubServiceImageRepository imageRepo;

    @Autowired
    private SubServiceRepository subServiceRepo;

    // Save multiple images for a specific SubService
    public String addImages(int serviceId, List<String> base64Images) {
        SubService subService = subServiceRepo.findById(serviceId).orElse(null);
        
        if (subService == null) {
            return "SubService not found!";
        }

        for (String base64 : base64Images) {
            SubServiceImage img = new SubServiceImage();
            img.setImage(base64);
            img.setSubService(subService);
            imageRepo.save(img);
        }
        return "Images uploaded successfully for Service ID: " + serviceId;
    }

    public List<SubServiceImage> getImagesByServiceId(int serviceId) {
        return imageRepo.findBySubServiceServiceId(serviceId);
    }

    public String deleteImage(int imageId) {
        if (imageRepo.existsById(imageId)) {
            imageRepo.deleteById(imageId);
            return "Image deleted successfully";
        }
        return "Image not found";
    }
}