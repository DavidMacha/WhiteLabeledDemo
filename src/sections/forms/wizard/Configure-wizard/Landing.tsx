"use client";

import { useRef, useState } from 'react';
import Hero from 'sections/landing/Header';
import Technologies from 'sections/landing/Technologies';
import Combo from 'sections/landing/Combo';
import Apps from 'sections/landing/Apps';
import Partner from 'sections/landing/Partner';
import SimpleLayout from 'layout/SimpleLayout';
import Pricing1Page from 'views/price/Pricing1';
import About from 'sections/landing/About';
import FooterBlock from 'sections/landing/FB';
import Header from 'layout/SimpleLayout/Header'; // Adjust the import path as needed

const Landing = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const pricingRef = useRef(null);

  // Step state to track the current step (e.g., OTP, Hero page, etc.)
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle "Next" button
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Function to handle "Back" button
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <SimpleLayout>
      {/* Step 1: OTP Verification Step */}
      {currentStep === 1 && (
        <div>
          {/* Your OTP component here */}
          <h2>OTP Step</h2>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Step 2: Hero and other components */}
      {currentStep === 2 && (
        <>
          <Header refs={{ aboutRef, servicesRef, pricingRef }} />
          <Hero />
          <Apps />
          <div ref={servicesRef}>
            <Technologies />
          </div>
          <Combo />
          <div ref={pricingRef}>
            <Pricing1Page />
          </div>
          <div ref={aboutRef}>
            <About />
          </div>
          <Partner />
          <FooterBlock />
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      )}

      {/* Step 3: Any additional steps */}
      {currentStep === 3 && (
        <div>
          {/* Example for a third step */}
          <h2>Third Step Content</h2>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Step 4: Final step */}
      {currentStep === 4 && (
        <div>
          <h2>Final Step Content</h2>
          <button onClick={handleBack}>Back</button>
        </div>
      )}
    </SimpleLayout>
  );
};

export default Landing;
