import React from "react";

const Biography = ({ imgaeUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imgaeUrl} alt="aboutimg" />
      </div>
      <div className="banner">
        <p>Biograpgyy</p>
        <h3>Who we are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque
          magnam dolorem hic nisi aspernatur aliquam! Nam, incidunt? Incidunt
          adipisci quibusdam hic ipsum illum quod voluptatibus dolorem voluptate
          mollitia asperiores corporis facere suscipit ducimus laboriosam odio
          quia at rerum, esse omnis possimus quasi cumque amet ab. Totam
          delectus sequi voluptas!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
          earum consequatur dolorem, ipsam, facilis obcaecati voluptatum
          repudiandae consequuntur nisi, nesciunt omnis in delectus quaerat
          accusantium nostrum repellendus enim. Reprehenderit possimus, iure
          dicta ea nulla nesciunt.
        </p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est, doloremque?</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  );
};

export default Biography;
