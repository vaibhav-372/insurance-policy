import React from 'react';

const Home = () => {
  return (
    <div className='bg-[url("src/assets/insurance-bg2.jpg")] w-full h-screen bg-cover  flex items-center justify-center'>
      <div className="text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Insurance Hub</h1>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Your one-stop destination for all insurance, loan, and mutual fund needs. We are dedicated to providing you with the best financial solutions to secure your future.
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Explore our wide range of services designed to meet your unique requirements. Whether it’s safeguarding your health, securing your family’s future, buying your dream home, or investing for the future, we have the perfect plan for you.
        </p>
      </div>
    </div>
  );
}

export default Home;
