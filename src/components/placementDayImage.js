import React from "react";

function PlacementDayImage(props) {
  return (
    <div className="placement-day-image-box">
      <img className="placement-day-image" alt={props.alt} src={props.src} />
    </div>
  );
}

export default PlacementDayImage;
