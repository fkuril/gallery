import React from 'react';
import ReactDOM from 'react-dom';
import { PhotosProvider } from './providers/PhotosProvider';
import { Gallery } from './components/Gallery';
import styles from './index.css';
import { ControlBar } from './components/ControlBar';

export function App() {
  return (
    <PhotosProvider>
      <div className={styles.app}>
        <Gallery />
        <ControlBar />
      </div>
    </PhotosProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
