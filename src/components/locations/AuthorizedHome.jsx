import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetLocationsQuery } from '../../store/services/locationsApi.js';
import styles from './AuthorizedHome.module.css'; 
import searchIcon from '../../assets/icons/searchIcon.svg'
import arrowIcon from '../../assets/icons/header-arrow-down.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';

const AuthorizedHome = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetLocationsQuery();

    const sortOptions = ["All", "Name", "Country"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };

        if (isSortOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSortOpen]);

    const handleSearch = () => {
        setSearchQuery(searchTerm.toLowerCase());
    }

    const filteredLocations = data?.users?.filter((loc) => {
       if (!searchQuery) return true;

        const companyName = loc.company?.name?.toLowerCase() || "";
        const country = loc.address?.country?.toLowerCase() || "";
        const city = loc.address?.city?.toLowerCase() || "";
        const companyCity = loc.company?.address?.city?.toLowerCase() || "";
            return (
                companyName.includes(searchQuery) ||
                country.includes(searchQuery) ||
                city.includes(searchQuery) ||
                companyCity.includes(searchQuery)
            );
    })
    .sort((a,b) => {
        if (sortBy === "Name") {
                return a.company.name.localeCompare(b.company.name);
            }
            if (sortBy === "Country") {
                return a.address.country.localeCompare(b.address.country);
            }
            return 0;
    });

    return (
        <main className={styles.container}>
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
                        <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </section>

            <div className={styles.contentGrid}>
                <div className={styles.leftColumn}>
                    <div className={styles.filterBar}>
                        <div className={styles.sortContainer} ref={sortRef}>
                            <div 
                                className={styles.sortBy} 
                                onClick={() => setIsSortOpen(!isSortOpen)}
                            >
                                Sort by <span>{sortBy}</span> 
                                <img 
                                    src={arrowIcon} 
                                    alt="arrow" 
                                    className={isSortOpen ? styles.rotate : ""} 
                                />
                            </div>

                            {isSortOpen && (
                                <ul className={styles.sortDropdown}>
                                    {sortOptions.map(option => (
                                        <li 
                                            key={option} 
                                            onClick={() => {
                                                setSortBy(option);
                                                setIsSortOpen(false);
                                            }}
                                            className={sortBy === option ? styles.activeOption : ""}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <button className={styles.filterBtn}>
                            <span className={styles.filterText}>Filter</span>
                            <img src={filterIcon} alt="filter-icon" />
                        </button>
                    </div>

                    <section className={styles.listSide}>
                        {isLoading && <p className={styles.statusMsg}>Loading locations...</p>}
                        
                        {filteredLocations?.map((loc) => (
                            <article key={loc.id} className={styles.locationCard}>
                                <div className={styles.imageWrapper}>
                                <img 
                                    src={loc.landImage} 
                                    onError={(e) => { e.target.src = loc.backupImage; }}
                                    alt={loc.address.city} 
                                    className={styles.locationImage}
                                />
                                </div>
                                <div className={styles.cardFooter}>
                                    <div className={styles.textGroup}>
                                        <h3 className={styles.companyName}>{loc.company.name}</h3>
                                        <p className={styles.countryName}>{loc.address.country}</p>
                                    </div>
                                    <button 
                                        className={styles.cardShopBtn}
                                        onClick={() => window.location.href = `/shop?location=${loc.address.city}`}
                                    >
                                        Shop
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                </div>

                <section className={styles.mapSide}>
                    <div className={styles.mapMock}>
                        Interactive Map Placeholder
                        <br />
                        Markers available: {data?.users?.length || 0}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AuthorizedHome;