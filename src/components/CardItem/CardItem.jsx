import React from 'react';
import './CardItem.scss'
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const ProductCard = ({ product }) => {
  const prices = product.variants.map(variant => parseInt(variant.price));
  const minPrice = Math.min(...prices);

  return (
    <Link to={`/${product.categoryName}/${product.name}`} className='product-card-link'>
      <div className='product-card' >
        <FavoriteButton product={product}/>
        <div class="img-box" style={{ backgroundImage: `url(${product.colors[0].imgs[0]})` }}>
        </div>
        <div className='product-info'>
          <div className='product-name'>{product.name}</div>
          <div className='product-price'>От {minPrice} ₽</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;