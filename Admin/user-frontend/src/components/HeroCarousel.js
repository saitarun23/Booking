// src/components/HeroCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "../styles/heroCarousel.css";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";

export default function HeroCarousel({ images }) {
  const defaultImages = [hero1, hero2, hero3, hero4];
  const imagesToDisplay = images && images.length > 0 ? images : defaultImages;

  const swiperRef = useRef(null);

  return (
    <div className="hero-carousel-wrapper">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
        loop={true}
        className="hero-carousel"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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

      {/* Custom React-icon arrows */}
      <button
        className="hero-arrow hero-arrow-left"
        type="button"
        aria-label="Previous slide"
        onClick={() => swiperRef.current && swiperRef.current.slidePrev()}
      >
        <FiChevronLeft />
      </button>

      <button
        className="hero-arrow hero-arrow-right"
        type="button"
        aria-label="Next slide"
        onClick={() => swiperRef.current && swiperRef.current.slideNext()}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
