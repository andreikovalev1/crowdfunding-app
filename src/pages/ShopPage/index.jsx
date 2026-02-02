import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetLocationsQuery } from '../../store/services/locationsApi';
import ShopLocationCard from '../../components/ShopLocationCard';
import styles from './style.module.css';
import markerIcon from '../../assets/icons/marker-icon.svg';
import arrowIcon from '../../assets/icons/header-arrow-down.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';


const ShopPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { data } = useGetLocationsQuery();
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef();

    const selectedId = location.state?.selectedId;
    const cityQuery = searchParams.get('location');
    const sortOptions = ["All", "Name", "Country"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        if (isSortOpen) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSortOpen]);

    useLayoutEffect(() => {
        if (selectedId) {
            const timer = setTimeout(() => {
                const element = document.getElementById(`card-${selectedId}`);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [selectedId, finalLocations]);

    const baseData = location.state?.results || data?.users || [];

    const finalLocations = [...baseData]
        .filter(loc => {
            if (!cityQuery) return true;
            return loc.address?.city?.toLowerCase().includes(cityQuery.toLowerCase());
        })
        .sort((a, b) => {
            if (sortBy === "Name") return (a.company?.name || "").localeCompare(b.company?.name || "");
            if (sortBy === "Country") return (a.address?.country || "").localeCompare(b.address?.country || "");
            return 0;
        });

    return (
        <main>
            <div className={styles.investContainer}>
                <span className={styles.investTitle}>Invest</span>
                <hr className={styles.divider} />
            </div>

            <div className={styles.filterContainer}>
                <div className={styles.filterWrapper}>
                    <div className={styles.sortContainer} ref={sortRef}>
                    <div className={styles.sortBy} onClick={() => setIsSortOpen(!isSortOpen)}>
                        <span className={styles.sortLabel}>Sort by </span>
                        <span className={styles.currentSort}>{sortBy}</span> 
                        <img src={arrowIcon} alt="arrow" className={isSortOpen ? styles.rotate : ""} />
                    </div>
                    {isSortOpen && (
                        <ul className={styles.sortDropdown}>
                            {sortOptions.map(option => (
                                <li key={option} onClick={() => { setSortBy(option); setIsSortOpen(false); }}>
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
                    <button className={styles.mapBtnWrapper} onClick={() => navigate("/#map")}>
                        <img src={markerIcon} alt="map-marker" />
                        <span className={styles.mapTextBtn}>Map</span>
                    </button>
                </div>
            </div>
            
            <div className={styles.cardContainer}>
                {finalLocations.map(item => (
                    <div id={`card-${item.id}`} key={item.id}>
                        <ShopLocationCard 
                            loc={item}
                        />
                    </div>    
                ))}
            </div>
        </main>
    );
};

export default ShopPage;