import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import basketIcon from "../assets/icons/header-basket.svg";
import arrowIcon from "../assets/icons/header-arrow-down.svg";
import burgerIcon from "../assets/icons/hambergermenu.svg";

const Header = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = null;
    const location = useLocation();
    const cartCount = 0;

    useEffect (() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const NavLinks = () => (
        <>
            <Link to="/" className={location.pathname === "/" ? styles.active: ""}>Home</Link>
            <Link to="/">My plots</Link>
            <Link to="/">Contacts</Link>
            <Link to="/shop" className={location.pathname === "/shop" ? styles.active: ""}>Shop</Link>
            <Link to="/">Wallet</Link>
        </>
    )

    return (
        <header className={styles.header}>

            <div className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
                <img src={burgerIcon} alt="menu" />
            </div>

            <div className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ""}`}>
                <div className={styles.sidebarHeader}>
                    <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>X</button>
                </div>
                <nav className={styles.mobileNav}>
                    <NavLinks />
                </nav>
            </div>
            {isMenuOpen && <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />}
            <div className={styles.headerContent}>
                <nav className={styles.nav}>
                    <NavLinks />
                </nav>
                
                <div className={styles.basketContainer}>
                    <img src={basketIcon} className={styles.basketIcon} alt="basket"></img>
                    <span className={styles.badge}>{cartCount}</span>
                </div>
                <div className={styles.profile} ref={profileRef} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <img 
                        src={user?.photoURL } //|| "https://via.placeholder.com/35"
                        className={styles.avatar} 
                        alt="user">
                    </img>
                    <span className={`${styles.arrowIcon} ${isProfileOpen ? styles.arrowRotate : ""}`}>
                        <img src={arrowIcon} alt="arrow-down"></img>
                    </span>
                    {isProfileOpen && (
                        <div className={styles.profileDropdown}>
                            <Link to="/profile">Profile</Link>
                            <Link to="/orders">My orders</Link>
                            <button onClick={() => console.log('Logout')}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;