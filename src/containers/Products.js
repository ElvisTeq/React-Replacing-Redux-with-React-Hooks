import React, { useContext } from "react";

import ProductItem from "../components/Products/ProductItem";
import { useStore } from "../hook-store/store";
import "./Products.css";

const Products = (props) => {
  // Using Custom Hook
  const state = useStore()[0]; // [0] => [state, dispatch] (to get "state")

  return (
    <ul className="products-list">
      {state.products.map((prod) => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
