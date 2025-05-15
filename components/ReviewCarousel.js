import { useState } from "react";
import styles from "./ReviewCarousel.module.css";
import ReviewCard from "./ReviewCard";

const ReviewCarousel = ({ reviews }) => {
  const [index, setIndex] = useState(0);

  const nextReview = () => {
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className={styles.leftSection}>
      {reviews.length > 0 ? (
        <div className={styles.carouselContainer}>
          <button className={styles.navButton} onClick={prevReview}>
            ◀
          </button>
          <div className={styles.reviewSlider}>
            <div
              className={styles.reviewTrack}
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {reviews.map((review) => (
                <div className={styles.reviewSlide} key={review.id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
          <button className={styles.navButton} onClick={nextReview}>
            ▶
          </button>
        </div>
      ) : (
        <p className={styles.noContent}>No reviews available for this movie.</p>
      )}
    </div>
  );
};

export default ReviewCarousel;
