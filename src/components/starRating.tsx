import * as React from "react";
import "font-awesome/css/font-awesome.min.css";

const StarRating = ({ selectedStars }: any) => {
  const totalStars = 5;
  const firstMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars ? (
        <i key={i} className="fa fa-star text-yellow-500" />
      ) : (
        <i key={i} className="fa fa-star-o text-yellow-500" />
      )
    );
  };

  const secondMethod = () => {
    return [...Array(totalStars)].map((el, i: any) =>
      i < selectedStars && i + 1 > selectedStars ? (
        <i key={i} className="fa fa-star-half-o text-yellow-500" />
      ) : i < selectedStars ? (
        <i key={i} className="fa fa-star text-yellow-500" />
      ) : (
        <i key={i} className="fa fa-star-o text-yellow-500" />
      )
    );
  };
  return (
    <div className="text-base">
      {Number.isInteger(selectedStars) ? firstMethod() : secondMethod()}
    </div>
  );
};

export default StarRating;
