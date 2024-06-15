import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p className="footer-title">Не пропускай новые <br />поступления и акции</p>
        <div className="footer-form">
          <input
            className="footer-input"
            placeholder="Ваша почта"
          />
          <button className="footer-button">
            ПОДПИСАТЬСЯ
          </button>
        </div>
      </div>
      <div className="footer-links">
        <h3 className="footer-heading">Контакты</h3>
        <div className="footer-contacts">
          Санкт-Петербург <br />
          Гороховая улица, 45
        </div>
        <div className="footer-contacts">+7 (999) 999 99 99</div>
        <div className="footer-contacts">hello@frogstore.com</div>
        <div className="footer-social">
          <h4 className="footer-heading">Следите за нами</h4>
          <div className="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon className="footer-icon" />
            </a>
            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
              <TelegramIcon className="footer-icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-links-section">
          <h3 className="footer-heading">Покупателям</h3>
          <ul className="footer-links-list">
            <li><a href="/payment-delivery">Оплата и доставка</a></li>
            <li><a href="/credit">Кредит и рассрочка</a></li>
            <li><a href="/contacts">Контакты</a></li>
            <li><a href="/promotions">Акции</a></li>
          </ul>
        </div>
        <div className="footer-links-section">
          <h3 className="footer-heading">Сервис</h3>
          <ul className="footer-links-list">
            <li><a href="/repair">Ремонт</a></li>
            <li><a href="/warranty">Гарантия</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-links">
        <div className="footer-links-section">
            <h3 className="footer-heading">Каталог</h3>
            <ul className="footer-links-list">
                <li><a href="/laptops">Ноутбуки</a></li>
                <li><a href="/smartphones">Смартфоны</a></li>
                <li><a href="/tablets">Планшеты</a></li>
                <li><a href="/watches">Часы</a></li>
                <li><a href="/accessories">Аксессуары</a></li>
            </ul>
            </div>
      </div>
    </footer>
  );
};

export default Footer;