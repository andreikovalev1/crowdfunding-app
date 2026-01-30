import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import searchIcon from '../../assets/icons/searchIcon.svg';

const SearchBar = ({ onSearch, initialValue }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue || "");

    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <section className={styles.headerSection}>
            <h1 className={styles.mainTitle}>Locations</h1>
            <div className={styles.searchContainer}>
                <div className={styles.searchWrapper}>
                    <span className={styles.searchIcon}>
                        <img src={searchIcon} alt="search" />
                    </span>
                    <input 
                        type="text"
                        value={searchTerm} 
                        className={styles.searchInput} 
                        placeholder="Search by city, country"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button className={styles.searchBtn} onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SearchBar;