import React from 'react';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import "./repair.scss";

const RepairPage = () => {
    return (
        <div className='repair'>
            <Helmet>
                <title>Frog Store | Ремонт </title>
            </Helmet>
            <Header />
            <div className='repair-section'>
                <div className='repair-photo'></div>
                <div className='repair-header'>
                    <div className='repair-title'>Ремонт</div>
                    <div className='repair-body'>В зависимости от сложности до 3 дней <br /> При наличии гарантии - бесплатно</div>
                    <button className='repair-button'>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button>
                </div>
            </div>
            <div className='repair-section'>
                <div className='heading-repair'>Ремонт iPhone</div>
                <div className='repair-prices'> 
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Дисплей | <span>Замена дисплея</span></div>
                        <img src="/images/repair1.png" alt="" />
                    </div>
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Аккумулятор | <span>Замена аккумулятора</span></div>
                        <img src="/images/repair2.png" alt="" />
                    </div>
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Камера | <span>Замена камеры</span></div>
                        <img src="/images/repair3.png" alt="" />
                    </div>
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Корпус | <span>Замена корпуса</span></div>
                        <img src="/images/repair4.png" alt="" />
                    </div>
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Залитие | <span>Сложный ремонт</span></div>
                        <img src="/images/repair5.png" alt="" />
                    </div>
                    <div className='repair-block'>
                        <div className='repair-block-heading'>Плата | <span>Сложный ремонт</span></div>
                        <img src="/images/repair6.png" alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RepairPage;