import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "../styles/heroCarousel.css";

export default function HeroCarousel({ images }) {
  const defaultImages = [
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='500'%3E%3Crect fill='%23ddd' width='1000' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='30' fill='%23999'%3EVenue Image 1%3C/text%3E%3C/svg%3E",
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='500'%3E%3Crect fill='%23ddd' width='1000' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='30' fill='%23999'%3EVenue Image 2%3C/text%3E%3C/svg%3E",
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1000' height='500'%3E%3Crect fill='%23ddd' width='1000' height='500'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='30' fill='%23999'%3EVenue Image 3%3C/text%3E%3C/svg%3E",
  ];

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
          <img
            src={src}
            alt={`slide-${idx}`}
            className="hero-carousel-image"
            onError={(e) => {
              e.target.src = defaultImages[idx % defaultImages.length];
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
