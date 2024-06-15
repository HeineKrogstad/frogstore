import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { UserContext } from '../../UserContext';
import { Helmet } from 'react-helmet-async';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import './AuthorizePage.scss';

const LoginRegisterComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'https://frog-store-server.vercel.app/login' : 'https://frog-store-server.vercel.app/register';
    const body = isLogin ? { email, password } : { email, password, name };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('authToken', data.accessToken);
      const decodedToken = jwtDecode(data.accessToken);
      const userId = decodedToken.sub;

      fetch(`https://frog-store-server.vercel.app/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`
        }
      })
        .then(response => response.json())
        .then(userData => {
          setUser(userData);
          navigate('/profile');
        })
        .catch(error => console.error('Error fetching user data:', error));
    } else {
      console.error('Ошибка:', data);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Frog Store | Логин</title>
      </Helmet>
      <Header />
      <h1 className='auth-header'>Добро пожаловать</h1>
      <div className='auth-body'>
        <h2 className='auth-subheader'>{isLogin ? 'Вход' : 'Регистрация'}</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          {!isLogin && (
              <div className='login-input'>
                <label className='login-label'>Введите имя:</label>
                <input
                  className='login-value'
                  type="text"
                  placeholder='Ваше имя'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
          )}
          <div className='login-input'>
            <label className='login-label'>Введите E-mail:</label>
            <input
              className='login-value'
              type="email"
              placeholder='test@mail.xyz'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='login-input'>
            <label className='login-label'>Введите пароль:</label>
            <input
              className='login-value'
              placeholder='xxxxxx'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='login-button' type="submit">{isLogin ? 'Войти' : 'Продолжить'}</button>
        </form>
        <button className='switch-login-button' onClick={handleToggle}>
          {isLogin ? 'Еще не зарегистрированы?' : 'Уже зарегистрированы?'}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default LoginRegisterComponent;

