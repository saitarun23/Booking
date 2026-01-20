// src/utils/categoryVideos.js
import playVideo from "../assets/play.mp4";
import hallVideo from "../assets/hall.mp4";
import foodVideo from "../assets/food.mp4";
import artsVideo from "../assets/arts.mp4";

export const getCategoryVideo = (categoryName = "") => {
  const map = {
    "gamezone reservation": playVideo,
    "event hall reservation": hallVideo,
    "culinary reservations": foodVideo,
    "art & crafts": artsVideo,
  };

  return map[categoryName.toLowerCase()];
};
