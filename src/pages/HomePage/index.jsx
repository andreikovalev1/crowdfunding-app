import React, { useState, useRef, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetLocationsQuery } from '../../store/services/locationsApi';
import { setSearchQuery } from '../../store/slices/authSlice';

import GuestView from '../../components/GuestView';
import SearchBar from '../../components/SearchBar';
import LocationCard from '../../components/LocationCard';
import arrowIcon from '../../assets/icons/header-arrow-down.svg';
import filterIcon from '../../assets/icons/filter-icon.svg';
import styles from './style.module.css';

const MapDisplay = lazy(() => import('../../components/MapDisplay'));

const HomePage = () => {
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const searchQuery = useSelector((state) => state.auth.searchQuery);
    const { data, isLoading } = useGetLocationsQuery();
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const sortRef = useRef(null);
    const mapRef = useRef(null);
    const sortOptions = ["All", "Name", "Country"];

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        if (isSortOpen) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isSortOpen]);

    const filteredLocations = useMemo(() => {
    if (!data?.users) return [];
    
    return data.users.filter((loc) => {
        if (!debouncedQuery) return true;
        const q = debouncedQuery.toLowerCase();
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
    }, [data, debouncedQuery, sortBy]);

    const handleSearch = useCallback((query) => {
        dispatch(setSearchQuery(query));
    }, [dispatch]);

    useEffect(() => {
        if (window.location.hash === '#map' && mapRef.current && !isLoading) {
            mapRef.current.scrollIntoView({ behavior: 'smooth'});
        };
    }, [isLoading]);

    if (!user) return <GuestView />;

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
                            <LocationCard 
                            key={loc.id} 
                            loc={loc}
                            />
                        ))}

                        {filteredLocations?.length === 0 && !isLoading && (
                            <p className={styles.statusMsg}>No locations found.</p>
                        )}
                    </section>
                </div>

                <section className={styles.mapSide} ref={mapRef}>
                   <Suspense fallback={<div className={styles.mapLoader}>Loading Map...</div>}>
                        <MapDisplay locations={filteredLocations} />
                   </Suspense>
                </section>
            </div>
        </main>
    );
};

export default HomePage;