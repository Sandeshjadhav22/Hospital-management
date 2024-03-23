import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          nemo sunt quo fuga molestiae ipsam sint iure, temporibus sit nisi
          consectetur culpa quas delectus. Quod.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image"/>
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
