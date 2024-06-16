import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import './CartDropdown.scss';

const CartDropdown = ({ isOpen, onClose }) => {
    const { cart, removeFromCart } = useContext(CartContext);
    const [productImages, setProductImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductImages = async () => {
            const images = {};
            for (const item of cart) {
                const response = await fetch(`http://localhost:3001/products?name=${item.product.name}`);
                const data = await response.json();
                const product = data[0];
                const colorObject = product.colors.find(c => c.color.toLowerCase() === item.color.toLowerCase());
                const image = colorObject ? colorObject.imgs[0] : '';
                images[item.product.name] = image;
            }
            setProductImages(images);
        };
        fetchProductImages();
    }, [cart]);

    
    const handleCheckout = () => {
        navigate('/checkout'); // Программный переход на страницу оформления заказа
    };

    return (
        <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
            <div className="cart-dropdown">
                <div className='cart-main'>
                    <div className="cart-header">
                        <div>Корзина</div>
                        <button onClick={onClose} className="close-button">✕</button>
                    </div>
                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <p className='empty-cart'>Ваша корзина пуста</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className='item-main'>
                                        <img src={productImages[item.product.name]} alt={item.color} className="item-image"/>
                                        <div className="item-info">
                                            <div>{item.product.name} <br/> {item.variant.memory} ГБ <br/> {item.color}</div>
                                            <p>{item.variant.price} ₽</p>
                                        </div>
                                    </div>
                                    <button className='item-delete' onClick={() => removeFromCart(index)}>Удалить</button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cart-summary">
                        Сумма {cart.reduce((total, item) => total + item.variant.price, 0)} ₽
                    </div>
                </div>
                <button className="checkout-button" onClick={handleCheckout}>ОФОРМИТЬ</button>
            </div>
        </div>
    );
};

export default CartDropdown;