"use client";
import { useRouter } from "next/navigation";
import styles from "./landing.module.css";

export default function LandingPage() {
  const router = useRouter();
  const handleClick = () => {
  console.log("Button clicked, navigating...");
  router.push("/home");
};


  return (
    <div className={styles.landingContainer}>
      {/* Background image */}
      <img src="/background.jpg" alt="Background" className={styles.bgPoster} />

      {/* Content overlay */}
      <div className={styles.content}>
        <img src="/skilledity-logo.png" alt="Skilledity Logo" className={styles.logo} />
        <h1>Best viewing experience with Skilledity</h1>
       <p className={styles.tagline}>Explore movies by genre, rating, or popularity.</p>
        <button className={styles.landingButton} onClick={handleClick}>
            ▶ Start Watching Now
        </button>
      </div>
    </div>
  );
}
