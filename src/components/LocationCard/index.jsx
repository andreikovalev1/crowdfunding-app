import React from 'react';
import styles from './style.module.css';

const LocationCard = ({ loc }) => {
    const handleShopClick = () => {
        window.location.href = `/shop?location=${loc.address.city}`;
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