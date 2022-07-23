import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = (props) => {
  
  // const [cart, setCart] = useState([{
  //   _id: '',
  //   product_name: '',
  //   product_price: '',
  //   product_image: "",
  //   quantity_in_stock: 1,
  //   quantity: 1,
  //   subTotal: 1
  // }]);

  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  )
}
