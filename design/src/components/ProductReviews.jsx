
import { useState } from "react";
import { toast } from "react-toastify";
import "./ProductReviews.css";

function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem(
          `reviews-${productId}`
        )
      ) || []
    );
  });

  const [name, setName] = useState("");
  const [comment, setComment] =
    useState("");
  const [rating, setRating] =
    useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      toast.error(
        "Please complete the review."
      );
      return;
    }

    const newReview = {
      id: crypto.randomUUID(),
      name: name.trim(),
      comment: comment.trim(),
      rating,
      date:
        new Date().toLocaleDateString(),
    };

    const updated = [
      newReview,
      ...reviews,
    ];

    setReviews(updated);

    localStorage.setItem(
      `reviews-${productId}`,
      JSON.stringify(updated)
    );

    setName("");
    setComment("");
    setRating(5);

    toast.success(
      "Review submitted!"
    );
  };

  return (
    <section className="reviews-section">
      <h2>Customer Reviews</h2>

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <select
          value={rating}
          onChange={(e) =>
            setRating(
              Number(e.target.value)
            )
          }
        >
          <option value={5}>
            ⭐⭐⭐⭐⭐
          </option>

          <option value={4}>
            ⭐⭐⭐⭐
          </option>

          <option value={3}>
            ⭐⭐⭐
          </option>

          <option value={2}>
            ⭐⭐
          </option>

          <option value={1}>
            ⭐
          </option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button type="submit">
          Submit Review
        </button>
      </form>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">
            No reviews yet. Be the first to
            review this product.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="review-card"
            >
              <h4>{review.name}</h4>

              <p className="review-stars">
                {"⭐".repeat(
                  review.rating
                )}
              </p>

              <p>{review.comment}</p>

              <span>
                {review.date}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default ProductReviews;
