import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailsPage from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
  );
};

export default App;