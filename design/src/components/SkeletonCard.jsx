import "./SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>

      <div className="skeleton-title"></div>

      <div className="skeleton-price"></div>

      <div className="skeleton-button"></div>
    </div>
  );
}

export default SkeletonCard;