import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../store/slices/authSlice';
import ShopLocationCard from '../../components/ShopLocationCard';
import shopStyles from '../ShopPage/style.module.css'; 
import styles from './style.module.css';

const CartPage = () => {
    const { cart } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <main className={styles.cartPage}>
            <div className={shopStyles.investContainer}>
                <span className={shopStyles.investTitle}>Your Selection</span>
                <hr className={shopStyles.divider} />
            </div>

            {cart.length > 0 ? (
                <div className={shopStyles.cardContainer}> 
                    {cart.map(item => (
                        <ShopLocationCard 
                            key={item.id} 
                            loc={item} 
                            isCart={true} 
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.emptyMsg}>Your cart is currently empty.</div>
            )}
            {cart.length > 0 && (
                <div className={styles.summaryContainer}>
                    <div className={styles.totalInfo}>
                        <span>Total Amount:</span>
                        <span className={styles.totalPrice}>
                            €{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                        </span>
                    </div>
                    <button className={styles.checkoutBtn}>
                        Checkout Now
                    </button>
                </div>
            )}
        </main>
    );
};

export default CartPage;