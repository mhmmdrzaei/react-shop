import { createContext, useState, useEffect } from 'react';

export const removeX = (cartItems,productToRemove) => {
	return cartItems.filter(cartItem=> cartItem.id !== productToRemove.id);
}

export const removeCartItem = (cartItems, productToRemove) => {
	    const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );

	// /// if the quantity is equal to 1
	    if (existingCartItem.quantity===1){
	    	return cartItems.filter(cartItem=> cartItem.id !== productToRemove.id)
	    }
	//if found, increment quantity 
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
	//return new array with modified cart items with new cart items/ cart items

}

export const addCartItem = (cartItems, productToAdd) => {
		//find if cart items contain product to add
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
	//if found, increment quantity 

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
	//return new array with modified cart items with new cart items/ cart items

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: ()=> {} ,
  removeItemX: ()=> {},
  totalAmount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [removeItem, itemRemoved] = useState([]);

  useEffect(()=> {
  	const newCardCount = cartItems.reduce((total, cartItem)=>{
  		return total + cartItem.quantity

  		
  	},0)
  	setCartCount(newCardCount);
  },[cartItems])

  useEffect(()=> {
  	const newTotalAmount = cartItems.reduce((total, cartItem)=>{
  		return (total + cartItem.price) * cartItem.quantity

  		
  	},0)
  	setTotalAmount(newTotalAmount);
  },[cartItems])

  const removeItemFromCart = (productToRemove) => 
  	setCartItems(removeCartItem(cartItems, productToRemove));

  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemX= (productToRemove) => 
  	setCartItems(removeX(cartItems,productToRemove));

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, totalAmount, removeItemFromCart, removeItemX };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};