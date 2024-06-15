import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { CartContext } from '../../CartContext';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './CheckoutPage.scss';

const CheckoutPage = () => {
    const { user, loading } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        recipient: '',
        phone: '',
        address: '',
        apartment: '',
        pickup: false,
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
    });

    const [orderSuccess, setOrderSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, pickup: e.target.checked });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const orderItems = cart.map(item => ({
            product: {
                id: item.product.id,
                name: item.product.name,
                category: item.product.category
            },
            variant: item.variant,
            color: item.color
        }));

        const totalAmount = cart.reduce((total, item) => total + parseInt(item.variant.price), 0);

        const orderData = {
            userId: user ? user.id : null,
            items: orderItems,
            delivery: {
                recipient: formData.recipient,
                phone: formData.phone,
                address: formData.pickup ? 'Самовывоз' : formData.address,
                apartment: formData.pickup ? '' : formData.apartment
            },
            totalAmount: totalAmount
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setCart([]);
                setOrderSuccess(true);

                setTimeout(() => {
                    setOrderSuccess(false);
                    navigate('/');
                }, 2000);
            } else {
                console.error('Ошибка при оформлении заказа');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных заказа:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="checkout-page">
            <Helmet>
                <title>Frog Store | Оформление заказа</title>
            </Helmet>
            <Header />
            <div className='checkout-main'>
                <div className="checkout-steps">
                    <div className={`checkout-step ${step === 1 ? 'active' : ''}`}>
                        <h2 className='checkout-heading'>1 Регистрация</h2>
                        {user ? (
                            <div>
                                <p className='checkout-login'>Вы вошли как {user.name}</p>
                                <button className='checkout-login-button' onClick={handleNextStep}>ПЕРЕЙТИ К ДОСТАВКЕ</button>
                            </div>
                        ) : (
                            <div>
                                <p className='checkout-login'>Для оформления заказа, пожалуйста, войдите)</p>
                                <button className='checkout-login-button' onClick={() => navigate('/login')}>ВОЙТИ</button>
                            </div>
                        )}
                    </div>
                    <div className={`checkout-step ${step === 2 ? 'active' : ''}`}>
                        <h2 className='checkout-heading'>2 Детали доставки</h2>
                        <form className='checkout-label'>
                            <div className='checkout-pickup'>
                                <label htmlFor='checkout-checkbox'>
                                    Самовывоз из магазина
                                </label>
                                <input type="checkbox" id='checkout-checkbox' name="pickup" checked={formData.pickup} onChange={handleCheckboxChange} />
                            </div>
                            <label>
                                <input type="text" placeholder='Получатель' name="recipient" value={formData.recipient} onChange={handleInputChange} required />
                            </label>
                            <label>
                                <input required type="tel" placeholder='Контактный телефон' name="phone" value={formData.phone} onChange={handleInputChange}/>
                            </label>
                            {!formData.pickup && (
                                <>
                                    <label>
                                        <input type="text" placeholder='Адрес' name="address" value={formData.address} onChange={handleInputChange} />
                                    </label>
                                    <label>
                                        <input type="text" placeholder='Квартира' name="apartment" value={formData.apartment} onChange={handleInputChange} />
                                    </label>
                                </>
                            )}
                            <button type="button" onClick={handlePreviousStep}>НАЗАД</button>
                            <button type="button" onClick={handleNextStep}>ПЕРЕЙТИ К ОПЛАТЕ</button>
                        </form>
                    </div>

                    <div className={`checkout-step ${step === 3 ? 'active' : ''}`}>
                        <h2 className='checkout-heading'>3 Оплата</h2>
                        <form onSubmit={handleFormSubmit} className='checkout-label'>
                            <label className='checkout-card'>
                                Банковская карта
                                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" />
                            </label>
                            <div className="payment-details">
                                <label>
                                    <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM / ГГ" />
                                </label>
                                <label>
                                    <input type="text" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="CVV" />
                                </label>
                            </div>
                            <button type="button" onClick={handlePreviousStep}>НАЗАД</button>
                            <button type="submit">ОПЛАТИТЬ</button>
                        </form>
                    </div>
                </div>
                <div className="checkout-summary">
                    <h2 className='checkout-heading'>Состав заказа</h2>
                    <div className="checkout-cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="checkout-cart-item">
                                <img src={item.product.colors.find(color => color.color === item.color).imgs[0]} alt={item.product.name} />
                                <div>
                                    <p>{item.product.name} {item.variant.memory} ГБ {item.color}</p>
                                    <p>{item.variant.price} ₽</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total">
                        <p>Сумма</p>
                        <p> {cart.reduce((total, item) => total + parseInt(item.variant.price), 0)} ₽</p>
                    </div>
                </div>
            </div>
            <Footer/>
            {orderSuccess && (
                <div className="order-success-dialog">
                    <p>Ваш заказ принят!</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;