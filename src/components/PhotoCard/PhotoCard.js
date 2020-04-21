import React from 'react';
import styles from './PhotoCard.css';

export function PhotoCard({ url }) {
  return (
    <div className={styles.photoCard}>
      <img src={url} className={styles.photo} />
    </div>
  );
}
