import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../styles/heroCarousel.css";
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";

export default function HeroCarousel({ images }) {
  const defaultImages = [hero1, hero2, hero3];

  const imagesToDisplay = images && images.length > 0 ? images : defaultImages;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="hero-carousel"
    >
      {imagesToDisplay.map((src, idx) => (
        <SwiperSlide key={idx} className="hero-carousel-slide">
          <div className="hero-slide">
            <div
              className="hero-slide-background"
              style={{ backgroundImage: `url(${src})` }}
            />
            <div className="hero-slide-overlay" />
            <img
              src={src}
              alt={`slide-${idx}`}
              className="hero-carousel-image"
              onError={(e) => {
                e.target.src = defaultImages[idx % defaultImages.length];
              }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
