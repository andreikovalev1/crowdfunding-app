import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/authSlice';
import styles from './style.module.css';
import grassIcon from '../../assets/icons/grass-rectangle.svg';

const ShopLocationCard = memo(({ loc, isSelected, isCart, onRemove, isInCart, cartType }) => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();

    if(!loc) return null;

    const price = Math.round((loc.height || 0) * 10);
    const size = Math.round(loc.weight || 0);
    const boxesCount = Math.min(Math.floor(size / 20), 5);
    const boxes = Array.from({ length: boxesCount || 1});

    const currentStatus = isInCart ? (cartType === 'reserve' ? 'reserved' : 'inCart') : 'idle';

    const handleAction = (type) => {
        if(isInCart) return;

        const newItem = {
            ...loc,
            cartType: type,
            price,
            addedAt: Date.now()
        };

        dispatch(addToCart(newItem));
        setIsPending(false);
    }

    return (
        <article className={`${styles.card} ${isSelected ? styles.selected : ''} ${currentStatus === "reserved" ? styles.isReserved : ""}`}>
            {!isCart && currentStatus === 'reserved' && (
                <div className={styles.reservedOverlay}>
                    <div className={styles.reservedBadge}>Reserved</div>
                </div>
            )}

            {isPending && (
                <div className={styles.confirmOverlay}>
                    <p>Reserve for 20 min?</p>
                    <div className={styles.confirmButtons}>
                        <button onClick={() => handleAction('reserve')} className={styles.confirmBtn}>Yes</button>
                        <button onClick={() => setIsPending(false)} className={styles.cancelBtn}>No</button>
                    </div>
                </div>
            )}

            <div className={styles.imageWrapper}>
                <img 
                    src={loc.landImage} 
                    onError={(e) => { e.target.src = loc.backupImage; }}
                    alt="location" 
                    className={styles.image} 
                />
                {isCart && (
                    <div className={styles.typeTag}>
                        {loc.cartType === 'reserve' ? '⏱ Reserved' : '💰 Investment'}
                    </div>
                )}
            </div>
            
            <div className={styles.content}>
                <h3 className={styles.title}>{loc.company.name}</h3>
                <p className={styles.locationText}>{loc.address.country}, {loc.address.city}</p>
                
                <div className={styles.details}>
                    <div className={styles.sizeSection}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{size}qm</span>
                        <div className={styles.boxesRow}>
                            {boxes.map((_, i) => (
                                <img key={i} src={grassIcon} alt="size-unit" className={styles.squareIcon} />
                            ))}
                        </div>
                    </div>
                    <div className={styles.priceSection}>
                        <span className={styles.label}>Guide Price:</span>
                        <span className={styles.priceValue}>€{price.toLocaleString()}</span>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    {isCart ? (
                        <button className={styles.removeBtn} onClick={() => onRemove(loc.id)}>
                            Remove from Cart
                        </button>
                    ) : (
                        <>
                            <button 
                                className={styles.investBtn} 
                                onClick={() => handleAction('invest')}
                                disabled={currentStatus !== 'idle'}
                            >
                                {currentStatus === 'inCart' ? 'In Cart' : 'Invest'}
                            </button>
                            <button 
                                className={styles.reserveBtn} 
                                onClick={() => setIsPending(true)}
                                disabled={currentStatus !== 'idle'}
                            >
                                {currentStatus === 'reserved' ? 'Reserved' : 'Reserve'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </article>
    );
});

export default ShopLocationCard;