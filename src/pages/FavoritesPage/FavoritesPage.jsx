import React, { useContext } from 'react';
import { FavoritesContext } from '../../FavoriteContext';
import { Helmet } from 'react-helmet-async';

import ProductCard from '../../components/CardItem/CardItem';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './FavoritesPage.scss';

const FavoritesPage = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className='favorites-page'>
            <Helmet>
                <title>Frog Store | Избранное</title>
            </Helmet>
            <Header/>
            <h1 className='favorites-header'>Избранное</h1>
            <div className='favorites-list'>
                {favorites.length > 0 ? (
                favorites.map((product, index) => (
                    <ProductCard key={index} product={product} className="product-card"/>
                ))
                ) : (
                <p className='favorites-empty'>Тут пусто, но у нас в каталоге много крутых товаров - посмотрите)</p>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default FavoritesPage;