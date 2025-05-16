// components/Footer.js
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h4>Home</h4>
          <ul>
            <li>Categories</li>
            <li>Devices</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>Movies</h4>
          <ul>
            <li>Genres</li>
            <li>Trending</li>
            <li>New Release</li>
            <li>Popular</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>Shows</h4>
          <ul>
            <li>Genres</li>
            <li>Trending</li>
            <li>New Release</li>
            <li>Popular</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>Support</h4>
          <ul>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h4>Subscription</h4>
          <ul>
            <li>Plans</li>
            <li>Features</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottomNote}>© 2025 Skilledity. All rights reserved.</div>
    </footer>
  );
}
