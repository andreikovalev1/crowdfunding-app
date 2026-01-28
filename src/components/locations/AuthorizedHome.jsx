import React from 'react';
import { useSelector } from 'react-redux';
import styles from './AuthorizedHome.module.css'; 

const AuthorizedHome = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <main className={styles.container}>
            <header className={styles.headerSection}>
                <h1 className={styles.mainTitle}>Locations</h1>
                
                <p className={styles.welcomeUser}>Welcome back, {user?.firstName}!</p>
                
                <div className={styles.searchPlaceholder}>Search by city, country...</div>
            </header>

            <div className={styles.contentGrid}>
                <section className={styles.listSide}>
                    <div className={styles.cardExample}>Green Acres Ranch Example</div>
                </section>

                <section className={styles.mapSide}>
                    {/* Здесь будет LocationsMap */}
                    <div className={styles.mapMock}>Interactive Map Placeholder</div>
                </section>
            </div>
        </main>
    );
};

export default AuthorizedHome;