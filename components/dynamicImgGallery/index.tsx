import Image from "./image";
import styles from "styles/DynamicImageGallery.module.scss"
import { useState } from "react";

// THIS SHOULD BE DYNAMICALLY DISPLAYED
export default function DynamicGallery({
  images,
}: {
  images: [{ file: string; url: string }];
}) {

  const [slide, setSlide] = useState(0)

  function incrementSlide() {
    setSlide((slide + 1) % images.length)
  }

  function decrementSlide() {
    setSlide((slide + images.length - 1) % images.length)
  }

  return (
    <div className={styles.galleryContainer}>
      <button onClick={incrementSlide}>This</button>
      <button onClick={decrementSlide}>Here</button>
      {images.map((image, index) => (
        <div key={index} className={styles.image} style={{
          display: displayStyle(index, slide)
        }}>
          <Image alt={image.file} src={image.url} />
        </div>
      ))}
    </div>
  );
}

function displayStyle(index: number, slide: number) {
  if (slide === index) return "flex"
  return "none"
}
