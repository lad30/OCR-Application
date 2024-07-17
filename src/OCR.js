// src/OCR.js

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './OCR.css';

const OCR = () => {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (image) {
      setIsLoading(true);
      Tesseract.recognize(
        image,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      )
        .then(({ data: { text } }) => {
          setText(text);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="OCR">
      <h1>OCR Application</h1>
      <input type="file" id="file" accept="image/*" onChange={handleImageChange} />
      <label htmlFor="file">Choose an Image</label>
      {imagePreviewUrl && <img src={imagePreviewUrl} alt="Selected" className="image-preview" />}
      <button onClick={handleClick}>Extract Text</button>
      {isLoading ? <p className="loading">Loading...</p> : <p>{text}</p>}
    </div>
  );
};

export default OCR;
