import axios from "axios";
import React, { useEffect, useState } from "react";

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cartProducts, setcartProducts] = useState(null);
  const [cartTotalPrice, setcartTotalPrice] = useState(0);
  const [cartTotalQuantity, setcartTotalQuantity] = useState(0);

  useEffect(() => {
    // get cart on component mount
    getCart();
  }, []);

  async function deleteCartItem(itemId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${itemId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setcartProducts(response.data.data.products);
        setcartTotalPrice(response.data.data.totalCartPrice);
        setcartTotalQuantity(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
 
  }
  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        // setcartProducts(response.data.data.products);
        // setcartTotalPrice(response.data.data.totalCartPrice);
        // setcartTotalQuantity(response.data.numOfCartItems);
        getCart();
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
  async function getCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setcartProducts(data.data.products);
      setcartTotalPrice(data.data.totalCartPrice);
      setcartTotalQuantity(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async function updateCartItem(itemId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${itemId}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setcartProducts(data.data.products);
      setcartTotalPrice(data.data.totalCartPrice);
      setcartTotalQuantity(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        getCart,
        addToCart,
        deleteCartItem,
        updateCartItem,
        setcartProducts,
        setcartTotalPrice,
        setcartTotalQuantity,
        cartProducts,
        cartTotalPrice,
        cartTotalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
