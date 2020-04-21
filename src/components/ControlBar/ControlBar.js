import React from 'react';
import { usePhotos } from '../../providers/PhotosProvider';
import styles from './ControlBar.css';
import { Dropdown } from '../Dropdown';

export function ControlBar() {
  const {
    orderBy,
    changePerPage,
    changeOrderBy,
    perPage,
    loadMoreClicked,
    currentPage,
    total,
    isLoading,
  } = usePhotos();

  return (
    <div className={styles.controlBar}>
      <div className={styles.controlBarItem}>
        <span className={styles.currentPageText}>
          Page {currentPage} of {Math.ceil(total / perPage)}
        </span>
      </div>
      <div className={styles.controlBarItem}>
        <Dropdown
          id="per-page"
          label="Per page:"
          value={perPage}
          onChange={event => changePerPage(event.target.value)}
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 30, label: '30' },
          ]}
        />
      </div>
      <div className={styles.controlBarItem}>
        <Dropdown
          id="order-by"
          label="Order by:"
          value={orderBy}
          onChange={event => changeOrderBy(event.target.value)}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'oldest', label: 'Oldest' },
            { value: 'popular', label: 'Popular' },
          ]}
        />
      </div>
      <div className={styles.controlBarItem}>
        <button
          className={styles.primaryButton}
          onClick={() => loadMoreClicked()}
          disabled={isLoading}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
