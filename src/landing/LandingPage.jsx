import React from 'react';
import Nav from './Nav';
import Services from './Services';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Home from './Home';

const LandingPage = () => {
  return (
    <div>
      <Nav />
      <section id="home">
        <Home />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="aboutUs">
        <AboutUs />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
};

export default LandingPage;
