import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { Carousel } from 'react-responsive-carousel';
import { Helmet } from 'react-helmet-async';

import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductPage.scss';

const ProductPage = () => {

    const { productname } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedMemory, setSelectedMemory] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
    fetch(`http://localhost:3001/products?name=${productname}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setProduct(data[0]);
            setSelectedMemory(data[0].variants[0].memory);
            setSelectedColor(data[0].colors[0].color);
        })
    }, [productname]);

    useEffect(() => {
        document.title = productname;
    }, [productname]);

    if (!product) {
    return <div>Загрузка...</div>;
    }

    const selectedVariant = product.variants.find(variant => variant.memory === selectedMemory);
    const selectedColorObj = product.colors.find(color => color.color === selectedColor);

    const handleMemoryChange = (event) => {
        setSelectedMemory(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleAddToCart = () => {
        addToCart(product, selectedVariant, selectedColor);
    };

    const getColorClass = (colorName) => {
        switch (colorName.toLowerCase()) {
            case 'silver':
            return 'color-silver';
            case 'midnight':
            return 'color-dark-grey';
            case 'space grey':
            return 'color-space-grey';
            case 'gold':
            return 'color-gold';
            default:
            return '';
        }
    };

    return (
    <div className="product-page">
        <Helmet>
            <title>Frog Store | {product.name}</title>
        </Helmet>
        <Header/>
        <div className='product-main'>
            <Carousel 
                className='product-carousel'
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                >
                {selectedColorObj.imgs.map((img, index) => (
                <div key={index}>
                    <img src={img} alt={`${selectedColor} ${index}`} />
                </div>
                ))}
            </Carousel>
            <div className='main-info'>
                <div className='product-head'>
                    <h1 className='product-title'>{product.name} {selectedVariant.price} ₽</h1>
                    <FavoriteButton product={product}/>
                </div>
                <p className='product-body'>{product.description}</p>
                <div className="memory-selection">
                    <span>Память</span>
                    {product.variants.map((variant, index) => (
                    <label 
                        key={index}
                        className={`memory-option ${selectedMemory === variant.memory ? 'selected' : ''}`}
                        onClick={() => setSelectedMemory(variant.memory)}
                    >
                        <input
                            type="radio"
                            name="memory"
                            value={variant.memory}
                            checked={selectedMemory === variant.memory}
                            onChange={handleMemoryChange}
                            style={{ display: 'none' }}
                        />
                        {variant.memory} ГБ
                    </label>
                    ))}
                </div>
                <div className="color-selection">
                    <span>{selectedColor}</span>
                    {product.colors.map((colorOption, index) => (
                        <label
                            key={index}
                            className={`color-option ${selectedColor === colorOption.color ? 'selected' : ''}`}
                            onClick={() => setSelectedColor(colorOption.color)}
                            >
                            <input
                                type="radio"
                                name="color"
                                value={colorOption.color}
                                checked={selectedColor === colorOption.color}
                                onChange={handleColorChange}
                                style={{ display: 'none' }}
                            />
                            <span className={`color-circle ${getColorClass(colorOption.color)} ${selectedColor === colorOption.color ? 'selected' : ''}`}></span>
                        </label>
                    ))}
                </div>
                <button className='add' onClick={handleAddToCart} >ДОБАВИТЬ В КОРЗИНУ</button>
            </div>
        </div>
        <div className='you-may-like'>Вам может понравиться</div>

                    
        <Footer/>
    </div>
    );
};

export default ProductPage;