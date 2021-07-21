import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem";

export default function ImageGallery({ images, onImgClick }) {
  return (
    <ul className={styles.ImageGallery}>
      <ImageGalleryItem images={images} onImgClick={onImgClick} />
    </ul>
  );
}
