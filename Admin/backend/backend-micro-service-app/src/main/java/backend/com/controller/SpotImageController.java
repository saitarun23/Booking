package backend.com.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import backend.com.entity.SpotImage;
import backend.com.service.SpotImageService;

@RestController
@RequestMapping("spot_image")
@CrossOrigin("*")
public class SpotImageController {

    @Autowired
    SpotImageService spotImageService;

    @PostMapping(value = "add/{spotId}")
    public String addImages(@PathVariable("spotId") int spotId, @RequestParam("files") MultipartFile[] files) {
        try {
            return spotImageService.addImages(spotId, files);
        } catch (IOException e) {
            return "Error uploading images: " + e.getMessage();
        }
    }

    @GetMapping(value = "find_by_spot/{spotId}")
    public List<SpotImage> findBySpot(@PathVariable("spotId") int spotId) {
        return spotImageService.findImagesBySpotId(spotId);
    }

    @PutMapping(value = "update/{imageId}")
    public String updateImage(@PathVariable("imageId") int imageId, @RequestParam("file") MultipartFile file) {
        try {
            return spotImageService.updateImage(imageId, file);
        } catch (IOException e) {
            return "Error updating image: " + e.getMessage();
        }
    }

    @DeleteMapping(value = "delete/{imageId}")
    public String deleteImage(@PathVariable("imageId") int imageId) {
        return spotImageService.deleteImage(imageId);
    }
}