import React, { useRef } from "react";
import { motion } from "framer-motion";
import img from "../../assets/img/property/2/2.jpg";
import img2 from "../../assets/img/property/25/9.jpg";
import img3 from "../../assets/img/property/22/4.JPG";
import img4 from "../../assets/img/property/5/1.JPG";
import img5 from "../../assets/img/property/6/2.jpg";
import img6 from "../../assets/img/property/23/6.JPG";
import img7 from "../../assets/img/property/16/9.jpg";
import img8 from "../../assets/img/property/22/10.JPG";
import img9 from "../../assets/img/property/22/14.jpg";
import img10 from "../../assets/img/property/16/10.jpg";


const imageCategories = [
  { src: img, alt: "Image 1" },
  { src: img2, alt: "Image 2" },
  { src: img3, alt: "Image 3" },
  { src: img4, alt: "Image 4" },
  { src: img5, alt: "Image 5" },
  { src: img6, alt: "Image 5" },
  { src: img7, alt: "Image 5" },
  { src: img8, alt: "Image 5" },
  { src: img9, alt: "Image 5" },
  { src: img10, alt: "Image 5" },


  
];

const GalleryCarousel = () => {
  const carouselRef = useRef(null);

  const handleMouseScroll = (e) => {
    e.preventDefault();
    carouselRef.current.scrollLeft += e.deltaY;
  };

  return (
    <div className="relative max-w-9xl py-2 mx-full mt-12 px-full">
      <div
        className="flex overflow-x-scroll h-auto scrollbar-hide"
        ref={carouselRef}
        onWheel={handleMouseScroll}
      >
        {imageCategories.map((image, index) => (
          <motion.div
            key={index}
            className="shrink-0 w-96 h-80 mx-2 overflow-hidden rounded-md"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
