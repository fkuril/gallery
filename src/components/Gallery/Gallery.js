import React from 'react';
import { usePhotos } from '../../providers/PhotosProvider';
import { PhotoCard } from '../PhotoCard';
import styles from './Gallery.css';

export function Gallery() {
  const { photos } = usePhotos();

  const heightRatios = [0, 0, 0];
  const itemsByColumn = [[], [], []];

  photos.forEach(photo => {
    const minHeightIdx = heightRatios.indexOf(Math.min(...heightRatios));
    const photoCard = (
      <div key={photo.id} className={styles.galleryItem}>
        <PhotoCard url={photo.urls.small} />
      </div>
    );

    itemsByColumn[minHeightIdx].push(photoCard);
    heightRatios[minHeightIdx] += photo.height / photo.width;
  });

  const [left, mid, right] = itemsByColumn;

  return (
    <div className={styles.gallery}>
      <div className={styles.column}>{left}</div>
      <div className={styles.column}>{mid}</div>
      <div className={styles.column}>{right}</div>
    </div>
  );
}
