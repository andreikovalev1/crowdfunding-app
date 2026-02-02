import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedLocationId } from '../../store/slices/authSlice';
import styles from './style.module.css';

const LocationCard = memo(({ loc }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(!loc) return null;

    const handleShopClick = (e) => {
        e.stopPropagation();
        dispatch(setSelectedLocationId(loc.id));
        navigate('/shop');
    };

    return (
        <article className={styles.locationCard} id={`card-${loc.id}`}>
            <div className={styles.imageWrapper}>
                <img 
                    src={loc.landImage} 
                    onError={(e) => { e.target.src = loc.backupImage; }}
                    alt={loc.address?.city} 
                    className={styles.locationImage}
                    loading="lazy"
                />
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.textGroup}>
                    <h3 className={styles.companyName}>{loc.company?.name}</h3>
                    <p className={styles.countryName}>{loc.address?.country}</p>
                </div>
                
                <div className={styles.actions}>
                    <button type="button" className={styles.cardShopBtn} onClick={handleShopClick}>Shop</button>
                </div>
            </div>
        </article>
    );
});

export default LocationCard;