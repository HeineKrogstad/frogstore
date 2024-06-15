import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../UserContext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CartDropdown from '../CartDropDown/CartDropdown';
import './Header.scss';

const Header = () => {
  const { user } = useContext(UserContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isCartOpen]);

  return (
    <header className="header">
      <a href="/" className="header-link">Каталог</a>
      <a href="/repair" className="header-link">Ремонт</a>
      <div></div>
      <a href="/favorite" className="header-link"><FavoriteBorderIcon /></a>
      {user ? (
        <a href="/profile" className="header-link">{user.name}</a>
      ) : (
        <a href="/login" className="header-link">Войти</a>
      )}
      <button onClick={toggleCart} className="header-cart">Корзина</button>
      <CartDropdown isOpen={isCartOpen} onClose={toggleCart} />
    </header>
  );
};

export default Header;
