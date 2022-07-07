import React, { useContext } from "react";

import FavoriteItem from "../components/Favorites/FavoriteItem";
import { useStore } from "../hook-store/store";
import "./Products.css";

const Favorites = (props) => {
  const state = useStore()[0]; // Get all Data
  const favoriteProducts = state.products.filter((p) => p.isFavorite); // Filter Favorite Data

  let content = <p className="placeholder">Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className="products-list">
        {favoriteProducts.map((prod) => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
