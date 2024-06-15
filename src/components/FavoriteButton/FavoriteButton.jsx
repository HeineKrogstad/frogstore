import React, { useContext } from 'react';
import { FavoritesContext } from '../../FavoriteContext';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteButton = ({ product }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some(item => item.name === product.name);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isFavorite) {
        removeFavorite(product);
    } else {
        addFavorite(product);
    }
  };

  return (
    <IconButton onClick={handleFavoriteClick}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
