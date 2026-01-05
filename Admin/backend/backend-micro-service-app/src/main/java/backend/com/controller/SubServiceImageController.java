package backend.com.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import backend.com.entity.SubServiceImage;
import backend.com.service.SubServiceImageService;

@RestController
@RequestMapping("subservice_images")
public class SubServiceImageController {

    @Autowired
    private SubServiceImageService imageService;

    // To add 4-5 images at once
    @PostMapping("/upload/{serviceId}")
    public String uploadImages(@PathVariable int serviceId, @RequestBody List<String> images) {
        return imageService.addImages(serviceId, images);
    }

    // Get all images for a specific SubService
    @GetMapping("/get_by_service/{serviceId}")
    public List<SubServiceImage> getImages(@PathVariable int serviceId) {
        return imageService.getImagesByServiceId(serviceId);
    }

    @DeleteMapping("/delete/{imageId}")
    public String deleteImage(@PathVariable int imageId) {
        return imageService.deleteImage(imageId);
    }
}