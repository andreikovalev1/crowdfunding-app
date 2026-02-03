import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const GuestView = () => {
useEffect(() => {
    document.body.style.backgroundColor = "#F0FEE2";

    return () => document.body.style.backgroundColor = "";
}, [])

    const navigate = useNavigate();
    const handleStartClick = () => {
        navigate('/login');
    };

    return (
        <main className={styles.container}>
            <section className={styles.welcomeBlock}>
                <h1>Rent your own field, invest in farming, and grow your own vegetables</h1>
                <button className={styles.welcomeBtn} onClick={handleStartClick}>
                    Let's start
                </button>
            </section>

            <section className={styles.cards}>
                <img src='/images/homePage-first.webp' alt="first-image" />
                <img src='/images/homePage-second.webp' alt="second-image" />
                <img src='/images/homePage-third.webp' alt="third-image" />
            </section>
        </main>
    );
};

export default GuestView;