"use client";
"use client";
import React, { useState } from 'react';
import WebPageRenderer from 'views/ZoomCall/WebPageRenderer';

const AddNewProductPage = () => {
  const [scale, setScale] = useState(0.8); // Default scale

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2)); // Limit max scale to 2
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5)); // Limit min scale to 0.5
  };

  return (
    <div>
      <h1>View External Website</h1>
      <WebPageRenderer url="https://zoom-test-nine.vercel.app" scale={scale} />

      {/* Zoom Controls */}
      <div style={{
          display: 'flex',
          justifyContent: 'center', // Center the buttons
          gap: '10px',
          marginTop: '10px', // Add some space above the buttons
      }}>
        <button onClick={zoomOut} style={buttonStyle}>Zoom Out</button>
        <button onClick={zoomIn} style={buttonStyle}>Zoom In</button>
      </div>
    </div>
  );
};

// Button styles
const buttonStyle = {
  padding: '8px 15px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.2s',
};

export default AddNewProductPage;




/*
// PROJECT IMPORTS
//import AddNewProduct from 'views/apps/AddNewProduct';
import dynamic from "next/dynamic";

const PreviewContainer = dynamic(() => import("feature/preview/preview").then(mod => mod.default), {
  ssr: false,
});

//import PreviewContainer from 'feature/preview/preview'

// ==============================|| ECOMMERCE - ADD PRODUCT ||============================== //

function AddNewProductPage() {
  return <PreviewContainer />;
}

export default AddNewProductPage;
*/