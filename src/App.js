import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import DetailsPage from "./pages/DetailsPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import GuestView from "./components/GuestView";
import AuthorizedHome from "./components/locations/AuthorizedHome";

const App = () => {
  return (
    <>
    <Router>
        <Header />
        <Routes>
            <Route path="/" element={<GuestView />} />
            <Route path="/home" element={<AuthorizedHome />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    </Router>
    </>
  );
};

export default App;