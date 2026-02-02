import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <>
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/basket" element={<CartPage />} />
        </Routes>
    </Router>
    </>
  );
};

export default App;