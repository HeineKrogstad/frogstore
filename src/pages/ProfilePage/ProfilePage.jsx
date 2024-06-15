import React, { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ProfilePage.scss';

const UserProfile = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [openOrderId, setOpenOrderId] = useState(null);

    const { user, logout, loading } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleOrderDetails = (orderId) => {
        setOpenOrderId(openOrderId === orderId ? null : orderId);
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const getImageForProduct = (productName, productColor) => {
        const product = products.find(p => p.name === productName);
        if (!product) return '';

        const color = product.colors.find(c => c.color === productColor);
        return color ? color.imgs[0] : '';
    };
    

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch(`/api/orders?userId=${user.id}`);
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user, fetchOrders]);

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div>
            <Header />
            <Helmet>
                <title>Frog Store | Личный кабинет </title>
            </Helmet>
            <div className="profile-container">
                <div className='profile-head'>
                    <div className='profile-heading'>
                        <h2 className='profile-title'>Здравствуйте, {user.name}</h2>
                        <button className='logout-button' onClick={logout}>Выйти</button>
                    </div>
                    <p className='profile-email'>{user.email}</p>
                </div> 
                <div className="orders-list">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="order-item" onClick={() => toggleOrderDetails(order.id)}>
                                <h4 className='order-head'>Заказ #{order.id}</h4>
                                {openOrderId === order.id && (
                                    <div className="order-details">
                                        <div className='order-delivery-info'>
                                            <p>Получатель: {order.delivery.recipient}</p>
                                            <p>Адрес: {order.delivery.address} {order.delivery.apartment}</p>
                                            <p>Телефон: {order.delivery.phone}</p>
                                        </div>
                                        <div className='order-info'>
                                            <div className="order-items">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="order-product">
                                                        <img className="order-product-img" src={getImageForProduct(item.product.name, item.color)} alt={item.product.name} />
                                                        <div className='order-product-info'>
                                                            <p>{item.product.name} {item.variant.memory} GB {item.color}</p>
                                                            <p>Категория: {item.product.category}</p>
                                                            <p>{item.variant.price}₽</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='order-sum'>Сумма: {order.totalAmount} руб.</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>У вас нет заказов.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;

