import { initStore } from "./store"; // Custom Hook expects (action, initialData)

const configureStore = () => {
  const actions = {
    // if dispatch('TOGGLE_FAV')
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex((p) => p.id === productId); // Find pruduct by ID

      const newFavStatus = !curState.products[prodIndex].isFavorite; // Set product to True if (!isFavorite)

      const updatedProducts = [...curState.products]; // Copy of products list

      // Update Product List
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return { products: updatedProducts };
    },
  };

  // Function from "store.js" => (stores data & actions)
  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
};

export default configureStore;
