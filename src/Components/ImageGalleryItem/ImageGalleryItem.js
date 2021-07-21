import React from "react";
import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ images, onImgClick }) {
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li
        className={styles.ImageGalleryItem}
        key={id}
        onClick={() => onImgClick(id)}
      >
        <img className={styles.img} src={webformatURL} alt={tags} />
      </li>
    );
  });
}
