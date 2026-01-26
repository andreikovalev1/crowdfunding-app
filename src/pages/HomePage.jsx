import React from "react";
import styles from "./HomePage.module.css";
const HomePage = () => {
    return (
        <main className={styles.container}>
            <section className={styles.welcomeBlock}>
                <h1>Rent your own field, invest in farming, and grow your own vegetables</h1>
                <button className={styles.welcomeBtn}>Let's start</button>
            </section>

            <section className={styles.cards}>
                <img src="first" alt="first-image"></img>
                <img src="second" alt="second-image"></img>
                <img src="third" alt="third-image"></img>
            </section>
        </main>
    )
}

export default HomePage;