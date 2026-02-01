import React from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './style.module.css';

const LocationCard = ({ loc, allLocations }) => {
    const navigate = useNavigate();

    const handleShopClick = () => {
       navigate(`/shop?location=${loc.address.city}`, {
        state: {
            results: allLocations,
            selectedId: loc.id,
        }
       });
    };

    return (
        <article className={styles.locationCard}>
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
                    onClick={handleShopClick}
                >
                    Shop
                </button>
            </div>
        </article>
    );
};

export default LocationCard;