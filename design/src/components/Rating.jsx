import { FaStar, FaRegStar } from "react-icons/fa";
import "./Rating.css";

function Rating({ rate = 5, count = 0 }) {
  const fullStars = Math.round(rate);

  return (
    <div className="rating">
      <div className="stars">
        {[...Array(5)].map((_, index) =>
          index < fullStars ? (
            <FaStar key={index} />
          ) : (
            <FaRegStar key={index} />
          )
        )}
      </div>

      <small>
        {rate.toFixed(1)} · {count} Reviews
      </small>
    </div>
  );
}

export default Rating;