import React, { useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import '../Styles/Gallery.css';

import img1 from '../assets/post 2.png';
import img2 from '../assets/Post 3.png';
import img3 from '../assets/Post.png';
import img4 from '../assets/R1.jpg';
import img5 from '../assets/J1.jpg';
import img6 from '../assets/A1.jpg';

const images = [img1, img2, img3, img4, img5, img6];

const Gallery = () => {
  const carouselRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const scroll = (direction) => {
    const { current } = carouselRef;
    if (current) {
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="gallery-section">
      <h4 className="gallery-label">GALLERY</h4>
      <h2 className="gallery-title">
        CHECK <span className="highlight">OUR GALLERY</span>
      </h2>

      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={() => scroll('left')}>
          &#10094;
        </button>

        <div className="carousel-frame" ref={carouselRef}>
          {images.map((img, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={img}
                alt={`gallery-${index}`}
                onClick={() => {
                  setPhotoIndex(index);
                  setIsOpen(true);
                }}
              />
            </div>
          ))}
        </div>

        <button className="carousel-arrow right" onClick={() => scroll('right')}>
          &#10095;
        </button>
      </div>

      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={images.map((src) => ({ src }))}
          on={{
            view: ({ index }) => setPhotoIndex(index),
          }}
        />
      )}
    </div>
  );
};

export default Gallery;
