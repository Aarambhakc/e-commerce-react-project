import { useContext } from "react";
import { Link } from "react-router-dom";
import { RecentlyViewedContext } from "../context/RecentlyViewedContext";
import "./RecentlyViewed.css";

function RecentlyViewed() {
  const { recent } = useContext(RecentlyViewedContext);

  if (!recent.length) return null;

  return (
    <section className="recent-section">
      <div className="recent-header">
        <p>Recently Viewed</p>
        <h2>Continue Exploring</h2>
      </div>

      <div className="recent-grid">
        {recent.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="recent-card"
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />

            <h3>{item.title}</h3>

            <span>${item.price.toFixed(2)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RecentlyViewed;