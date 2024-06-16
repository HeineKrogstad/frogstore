import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ProductCard from '../../components/CardItem/CardItem';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './categoryPage.scss';

const CategoryPage = () => {

    const { engname } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    useEffect(() => {
        if (category && category.engname) {
          fetch(`http://localhost:3001/products?categoryName=${category.engname}`)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
        }
    }, [category]);
    
    useEffect(() => {
        fetch(`http://localhost:3001/categories?engname=${engname}`)
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
              setCategory(data[0]);
            }
          })
          .catch(error => console.error('Error fetching category:', error));
    }, [engname]);

    return (
        <div className="category-page">
            <Helmet>
                <title>Frog Store | {category && category.name}</title>
            </Helmet>    
            <Header />
            <div className="category-page-container">
                <div className='category-image' style={{ backgroundImage: `url(${category.img})` }}>
                    <h2 className='category-header'>{category.name}</h2>
                </div>
                <div className="product-list">
                    {products.map((product, index) => {
                        return (
                        <div className='product-object' key={index}>
                            <ProductCard product={product} />
                        </div>
                        )
                    })}
                </div>
            </div>
            <Footer />    
        </div>
    );
};

export default CategoryPage;