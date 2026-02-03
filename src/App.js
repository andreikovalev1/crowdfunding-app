import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const CartPage = lazy(() => import('./pages/CartPage'));

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