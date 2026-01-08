package backend.com.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "spot_images")
@Data
public class SpotImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private String imageData; // Storing as Base64 String

    @ManyToOne
    @JoinColumn(name = "spot_id", nullable = false)
    @JsonBackReference
    private Spot spot;
}