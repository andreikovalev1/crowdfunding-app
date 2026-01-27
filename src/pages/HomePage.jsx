import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import firstImage from "../assets/images/homePage-first.png";
import secondImage from "../assets/images/homePage-second.png";
import thirdImage from "../assets/images/homePage-third.png";

const HomePage = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleStartClick = () => {
        if(!user) {
            navigate("/login");
        } else {
            navigate("/")
        }
    };

    if (!user) {
        return (
            <main className={styles.container}>
                <section className={styles.welcomeBlock}>
                    <h1>Rent your own field, invest in farming, and grow your own vegetables</h1>
                    <button className={styles.welcomeBtn} onClick={handleStartClick}>Let's start</button>
                </section>

                <section className={styles.cards}>
                    <img src={firstImage} alt="first-image"></img>
                    <img src={secondImage} alt="second-image"></img>
                    <img src={thirdImage} alt="third-image"></img>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.container}>
            <section className={styles.dashboard}>
                <h1>Welcome back, {user.firstName}!</h1>
                <p>Here are your active plots and statistics.</p>
                {/* Здесь будет логика для авторизованных пользователей */}
            </section>
        </main>
    );
   
}

export default HomePage;