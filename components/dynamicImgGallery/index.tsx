import Image from "next/image";
import styles from "styles/DynamicImageGallery.module.scss";
import importImages from "./import";
import { useState } from "react";

// THIS SHOULD BE DYNAMICALLY DISPLAYED
export default function DynamicGallery({
  images,
}: {
  images: Awaited<ReturnType<typeof importImages>>;
}) {
  const [slide, setSlide] = useState(0);

  const incrementSlide = () => setSlide((slide + 1) % images.length);
  const decrementSlide = () =>
    setSlide((slide + images.length - 1) % images.length);

  return (
    <div className={styles.galleryContainer}>
      {images.map((image, index) => (
        <div
          key={index}
          className={styles.image}
          style={{
            display: displayStyle(index, slide),
          }}
        >
          <Image
            src={image.url}
            alt={image.file}
            width={(image.meta.imageSize.width ?? 0) / 2}
            height={(image.meta.imageSize.height ?? 0) / 2}
            priority
          />
        </div>
      ))}
      <div className={styles.controls}>
        <button onClick={decrementSlide} className={styles.navButton}>
          &#10094;
        </button>
        <div className={styles.slideSelectors}>
          {images.map((element, index) => (
            <button
              key={index}
              className={styles.slideNumber}
              onClick={() => setSlide(index)}
              disabled={index === slide}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={incrementSlide} className={styles.navButton}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

function displayStyle(index: number, slide: number) {
  if (slide === index) return "flex";
  return "none";
}