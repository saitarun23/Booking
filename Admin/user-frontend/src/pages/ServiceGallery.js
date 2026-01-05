import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ServiceGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If images is still null or empty, the "Loading" state stays active
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading images from database...</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative flex items-center justify-center shadow-xl group">
      {/* IMPORTANT: 'images' is a List of SubServiceImage objects.
         We access '.image' which is the LONGTEXT Base64 string.
      */}
      <img
        key={images[currentIndex].imageId}
        src={`data:image/jpeg;base64,${images[currentIndex].image}`}
        alt="Gallery Slide"
        className="w-full h-full object-contain transition-opacity duration-500"
      />

      {images.length > 1 && (
        <>
          <button onClick={prevSlide} className="absolute left-4 bg-white/20 hover:bg-white/80 p-3 rounded-full text-white hover:text-black transition-all">
            <FiChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 bg-white/20 hover:bg-white/80 p-3 rounded-full text-white hover:text-black transition-all">
            <FiChevronRight size={24} />
          </button>
          
          <div className="absolute bottom-4 flex gap-2">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all ${currentIndex === idx ? "bg-blue-500 w-6" : "bg-white/50 w-2"}`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}