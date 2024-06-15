import React from 'react';
import './categoryHomeCard.scss';

const CategoryCard = ({ category, isImageFirst }) => {
  return (
    <div className="card-container">
      {isImageFirst ? (
        <>
          <img className="card-image" src={category.img} alt={category.name} />
          <div className="card-content">
            <h2 className="category-name">{category.name}</h2>
            <a className="buy-link" href={category.engname}>
               <span className="arrow">←</span> Купить
            </a>
          </div>
        </>
      ) : (
        <>
          <div className="card-content">
            <h2 className="category-name">{category.name}</h2>
            <a className="buy-link" href={category.engname}>
                Купить <span className="arrow">→</span> 
            </a>
          </div>
          <img className="card-image" src={category.img} alt={category.name} />
        </>
      )}
    </div>
  );
};

export default CategoryCard;
