'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/home?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logoSearchContainer}>
          <Link href="/" className={styles.logo}>
            MoviesApp
          </Link>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <ul className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuOpen : ''}`}>
          <li className={styles.navLink} onClick={() => scrollToSection('upcoming')}>
            Upcoming
          </li>
          <li className={styles.navLink} onClick={() => scrollToSection('latest')}>
            Latest
          </li>
          <li className={styles.navLink} onClick={() => scrollToSection('topRated')}>
            Top Rated
          </li>
          <li className={styles.navLink} onClick={() => scrollToSection('popular')}>
            Popular
          </li>
        </ul>

        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;