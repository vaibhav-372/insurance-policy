import React from 'react';

const ServiceCard = ({ imageSrc, subtitle, title, description }) => {
  return (
    <div className="xl:w-1/4 md:w-1/2 p-4">
      <div className="bg-gray-950 bg-opacity-40 p-6 rounded-lg">
        <img className="h-40 rounded w-full mb-6" src={imageSrc} alt={title} />
        <h3 className="tracking-widest text-indigo-400 text-xs font-medium title-font">{subtitle}</h3>
        <h2 className="text-lg text-white font-medium title-font mb-4">{title}</h2>
        <p className="leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
