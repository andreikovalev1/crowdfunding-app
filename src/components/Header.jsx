import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Header.module.css";

import basketIcon from "../assets/icons/header-basket.svg";
import arrowIcon from "../assets/icons/header-arrow-down.svg";
import burgerIcon from "../assets/icons/hambergermenu.svg";
import defaultProfile from "../assets/icons/default-profile.png";


const Header = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const profileRef = useRef(null);

    const { user,token } = useSelector((state) => state.auth);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartCount = 0;

    useEffect (() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        setIsProfileOpen(false);
        navigate("/");
    }

    const NavLinks = ({onLinkClick}) => {
        const links = [
            { name: "Home", path: token ? "/home" : "/" },
            { name: "My plots", path: "/plots" },
            { name: "Contacts", path: "/contacts" },
            { name: "Shop", path: "/shop" },
            { name: "Wallet", path: "/wallet" },
        ];

        return (
            <>
                {links.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/"}
                        className={ ({isActive}) => (isActive ? styles.active : "")}
                        onClick={(e) => {
                            if (!user && link.path !== "/") {
                                e.preventDefault();
                                navigate("/login");
                            }
                            if (onLinkClick) onLinkClick();
                        }}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </>
        );
    };

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
                    <NavLinks onLinkClick={() => setIsMenuOpen(false)}/>
                </nav>
            </div>

            {isMenuOpen && <div className={styles.overlay} onClick={() => setIsMenuOpen(false)} />}
            <div className={styles.headerContent}>
                <nav className={styles.nav}>
                    <NavLinks />
                </nav>
                
                <div className={styles.basketContainer} onClick={() => !user ? navigate("/login") : navigate("/basket")}>
                    <img src={basketIcon} className={styles.basketIcon} alt="basket"></img>
                    <span className={styles.badge}>{cartCount}</span>
                </div>

                <div 
                    className={styles.profile}
                    ref={profileRef}
                    onClick={() => {
                        if(!user) {
                            navigate("/login");
                        } else {
                            setIsProfileOpen(!isProfileOpen);
                        }
                    }}
                >
                    <img 
                        src={user?.image || defaultProfile} 
                        className={styles.avatar} 
                        alt="user">
                    </img>

                    <span className={`${styles.arrowIcon} ${isProfileOpen ? styles.arrowRotate : ""}`}>
                        <img src={arrowIcon} alt="arrow-down"></img>
                    </span>

                    {isProfileOpen && user && (
                        <div className={styles.profileDropdown} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.userInfo}>
                                <strong>{user.firstName}</strong>
                                <span>{user.email}</span>
                            </div>

                            <hr />

                            <Link to="/profile" onClick={() => setIsProfileOpen(false)}>Profile</Link>
                            <Link to="/orders" onClick={() => setIsProfileOpen(false)}>My orders</Link>
                            <button className={styles.logoutBtn} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;