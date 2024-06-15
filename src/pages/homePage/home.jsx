import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { Helmet } from 'react-helmet-async';

import CategoryCard from '../../components/CategoryHomeCard/categoryHomeCard';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import "./home.scss";


const HomePage = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('https://frog-store-server.vercel.app/categories')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, []);

    return (
        <div className="home"> 
            <Helmet>
                <title>Frog Store | Каталог </title>
            </Helmet>
            <Header />
            <div className='main-section'>
                <div className='welcome'>
                    <div className='welcome-heading'>
                        <h1 className='heading'>Frog Store</h1>
                        <h2 className='subheading'>Интернет-магазин новой и Б/У <br />электроники и цифровой техники. <br />Гарантия, ремонт и бесплатная доставка <br />по СПБ</h2>
                    </div>
                    <img src="/images/logo.png" alt="" />
                </div>
                <div className="categories">
                    {categories.map((category, index) => (
                    <CategoryCard
                    key={category.id}
                    category={category}
                    isImageFirst={index % 2 === 1}
                    />
                    ))}
                </div>
            </div>
            <div className='benefit-section'>
                <div className='heading-benefit'>Почему мы?</div>
                <div className='benerfits'> 
                    <div className='benefit-block'>
                    <div className='benefit-block-heading'>Гарантия</div>
                    <div className='benefit-block-body'>Предоставляем 1 год гарантии на всю технику. Профессионалы из нашего сервисного центра произведут ремонт или мы вернем Вам деньги.</div>
                    </div>
                    <div className='benefit-block'>
                    <div className='benefit-block-heading'>Индивидуальный подход</div>
                    <div className='benefit-block-body'>С 2020 года мы предоставляем качественный сервис в Санкт-Петербурге. Наша команда техно-гиков проконсультирует вас и ответит на самые разные вопросы, а также подберет технику под Ваши требования. </div>
                    </div>
                    <div className='benefit-block'>
                    <div className='benefit-block-heading'>Выгодный Trade-In</div>
                    <div className='benefit-block-body'>Честно оценим Вашу технику и дадим до 90% от цены новой. Проще и выгоднее, чем продавать самостоятельно. </div>
                    </div>
                </div>
            </div>
            <div className='contacts-section'>
                <div className='contacts'>
                    <div className='contacts-header'>Контакты</div>
                    <div className='contacts-body'> 
                        <span><LocationOnIcon /> Санкт-Петербург Гороховая улица, 45</span>
                        <span><PhoneEnabledIcon /> +7 (999) 999 99 99</span>
                        <span><PhoneEnabledIcon /> +7 (777) 777 77 77</span>
                    </div>
                </div>
                <div className='our-shop'>
                    <div className='our-shop-photo'></div>
                    <div className='follow-us'>
                        <div className='follow-us-header'>Следите за нами</div>
                        <div className='social-medias'>
                            <InstagramIcon />
                            <TelegramIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className='where-we-section'>Где мы</div>
            <Footer />
        </div>
    );
};

export default HomePage;