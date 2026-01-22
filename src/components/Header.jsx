import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={{display: 'flex', gap: '40px', padding: '35px', color: 'black'}}>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/'>My plots</Link>
                <Link to='/'>Contacts</Link>
                <Link to='/'>Shop</Link>
                <Link to='/'>Wallet</Link>
            </nav>
        </header>
    );
};

export default Header;