import React from 'react';

const StarRating = ({ rating, interactive = false, onChange }) => {
  const stars = [];
  const numericRating = Number(rating) || 0;
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= numericRating;
    const isHalf = !interactive && numericRating > i - 1 && numericRating < i;
    const starClass = isFilled ? "star-filled" : isHalf ? "star-half" : "star-empty";
    const star = <span aria-hidden="true" className={starClass}>★</span>;

    if (interactive) {
      stars.push(
        <button
          key={i}
          type="button"
          className="star-rating-button"
          aria-label={`Rate ${i} out of 5 stars`}
          aria-pressed={isFilled}
          onClick={() => onChange(i)}
        >
          {star}
        </button>
      );
    } else {
      stars.push(<span key={i}>{star}</span>);
    }
  }

  return <span className={interactive ? "star-rating-input" : ""}>{stars}</span>;
};

export default StarRating;