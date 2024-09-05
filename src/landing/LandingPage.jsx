import React from 'react';
import Nav from './Nav';
import Services from './Services';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Home from './Home';

const LandingPage = () => {
  // Define the data for the cards


  return (
    <div>
      <Nav />
      <Home />
      <Services />
      <AboutUs />
      <ContactUs />
    </div>
  );
};

export default LandingPage;
