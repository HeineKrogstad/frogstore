import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './FavoriteContext.js';
import { UserProvider } from './UserContext.js';
import { CartProvider } from './CartContext.js';
import { HelmetProvider } from 'react-helmet-async';

import HomePage from './pages/homePage/home';
import RepairPage from './pages/RepairPage/repair';
import CategoryPage from './pages/categoryPage/categoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import LoginRegisterComponent from './pages/AuthorizePage/AuthorizePage';
import UserProfile from './pages/ProfilePage/ProfilePage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <UserProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/repair" element={<RepairPage />} />
                <Route path="/:engname" element={<CategoryPage />} />
                <Route path="/favorite" element={<FavoritesPage />} />
                <Route path="/login" element={<LoginRegisterComponent />} />
                <Route path="/:engname/:productname" element={<ProductPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </UserProvider>
    </HelmetProvider>
  );
}

export default App;