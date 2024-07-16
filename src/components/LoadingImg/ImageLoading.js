import React from 'react';
import './ImageLoading.css';

const ImageLoading = () => {
  return (
    <div className="loading-container">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2Floading-diamond.gif?alt=media&token=4e137447-e580-40b7-83b3-4a2be8c0d061"
        alt="Loading..."
        className="loading-image"
      />
    </div>
  );
};

export default ImageLoading;
