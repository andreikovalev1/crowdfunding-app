import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetLocationsQuery } from '../../store/services/locationsApi';
import { setSearchQuery } from '../../store/slices/authSlice';

import GuestView from '../../components/GuestView';
import SearchBar from '../../components/SearchBar';
import LocationCard from '../../components/LocationCard';
import arrowIcon from '../../assets/icons/header-arrow-down.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';
import styles from './style.module.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const { user, searchQuery } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetLocationsQuery();
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortRef = useRef(null);
    const sortOptions = ["All", "Name", "Country"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        if (isSortOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSortOpen]);

    if (!user) return <GuestView />;

    const filteredLocations = data?.users?.filter((loc) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (loc.company?.name || "").toLowerCase().includes(q) ||
            (loc.address?.country || "").toLowerCase().includes(q) ||
            (loc.address?.city || "").toLowerCase().includes(q)
        );
    }).sort((a, b) => {
        if (sortBy === "Name") return (a.company?.name || "").localeCompare(b.company?.name || "");
        if (sortBy === "Country") return (a.address?.country || "").localeCompare(b.address?.country || "");
        return 0;
    });

    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
    };

    return (
        <main className={styles.container}>
            <SearchBar onSearch={handleSearch} initialValue={searchQuery}/>

            <div className={styles.contentGrid}>
                <div className={styles.leftColumn}>
                    
                    <div className={styles.filterBar}>
                        <div className={styles.sortContainer} ref={sortRef}>
                            <div className={styles.sortBy} onClick={() => setIsSortOpen(!isSortOpen)}>
                                Sort by <span>{sortBy}</span> 
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
                    </div>

                    <section className={styles.listSide}>
                        {isLoading && <p className={styles.statusMsg}>Loading locations...</p>}
                        
                        {filteredLocations?.map((loc) => (
                            <LocationCard key={loc.id} loc={loc} />
                        ))}

                        {filteredLocations?.length === 0 && !isLoading && (
                            <p className={styles.statusMsg}>No locations found.</p>
                        )}
                    </section>
                </div>

                <section className={styles.mapSide}>
                    <div className={styles.mapMock}>
                        <p>Interactive Map will be here</p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HomePage;