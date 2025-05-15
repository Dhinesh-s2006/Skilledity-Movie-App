import styles from '../styles/ReviewCard.module.css';
import Image from 'next/image';
import { getImageUrl } from '../services/api';

const ReviewCard = ({ review }) => {
  const { author, content, created_at, author_details } = review;
  const avatarPath = author_details?.avatar_path;
  const avatar = avatarPath ? 
    (avatarPath.startsWith('/https') ? 
      avatarPath.substring(1) : 
      getImageUrl(avatarPath, 'w200')) : 
    '/placeholder-avatar.jpg';

  const date = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>
          <img src={avatar} alt={author} width={50} height={50} />
        </div>
        <div>
          <div className={styles.reviewAuthor}>{author}</div>
          <div className={styles.reviewDate}>{date}</div>
        </div>
      </div>
      <div className={styles.reviewContent}>
        {content.length > 500 ? `${content.substring(0, 500)}...` : content}
      </div>
    </div>
  );
};

export default ReviewCard;