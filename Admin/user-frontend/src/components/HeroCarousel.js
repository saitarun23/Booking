import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HeroCarousel({ images }) {
  const defaultImages = [
    "https://via.placeholder.com/1000x500?text=Venue+Image+1",
    "https://via.placeholder.com/1000x500?text=Venue+Image+2",
    "https://via.placeholder.com/1000x500?text=Venue+Image+3",
  ];

  const imagesToDisplay = images && images.length > 0 ? images : defaultImages;

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-[420px] rounded-lg overflow-hidden shadow"
    >
      {imagesToDisplay.map((src, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={src}
            alt={`slide-${idx}`}
            className="w-full h-[420px] object-cover"
            onError={(e) => {
              e.target.src = defaultImages[idx % defaultImages.length];
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
