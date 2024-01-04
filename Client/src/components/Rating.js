import React from "react";

function Rating({ value, text, color }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      {stars.map((starValue) => (
        <span key={starValue}>
          <i
            style={{ color }}
            className={
              value >= starValue
                ? "fas fa-star"
                : value >= starValue - 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

export default Rating;
