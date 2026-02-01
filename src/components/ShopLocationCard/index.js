import React from 'react';
import styles from './style.module.css';
import grassIcon from '../../assets/icons/grass-rectangle.svg';

const ShopLocationCard = ({ loc, isSelected }) => {

    if(!loc) return null;
    const price = Math.round((loc.height || 0) * 10);
    const size = Math.round(loc.weight || 0);
    const boxesCount = Math.min(Math.floor(size / 20), 5);
    const boxes = Array.from({ length: boxesCount || 1});

    return (
        <article className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
            <div className={styles.imageWrapper}>
                <img 
                    src={loc.landImage} 
                    onError={(e) => { e.target.src = loc.backupImage; }}
                    alt="location" 
                    className={styles.image} 
                />
            </div>
            
            <div className={styles.content}>
                <h3 className={styles.title}>
                    Unplanted field in {loc.address.city}
                </h3>
                <p className={styles.locationText}>{loc.address.country}</p>
                
                <div className={styles.details}>
                    <div className={styles.sizeSection}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{size}qm</span>
                        <div className={styles.boxesRow}>
                            {boxes.map((_, i) => (
                                <img
                                    key={i}
                                    src={grassIcon}
                                    alt="size-unit"
                                    className={styles.squareIcon}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className={styles.priceSection}>
                        <span className={styles.label}>Guide Price:</span>
                        <span className={styles.priceValue}>€{price.toLocaleString()}</span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.investBtn}>Invest</button>
                    <button className={styles.reserveBtn}>Reserve</button>
                </div>
            </div>
        </article>
    );
};

export default ShopLocationCard;