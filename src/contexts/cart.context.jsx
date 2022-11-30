import { createContext, useReducer } from 'react';

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartCount: 0,
    cartItems: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
  const {type, payload} = action

  switch(type) {
  case CART_ACTION_TYPES.SET_CART_ITEMS:
    return {
      ...state,
      ...payload
    }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    return {
      ...state,
      isCartOpen: payload
    }

    default:
    throw new Error(`unhandled type of ${type} in cartReducer`)
  }


}

export const CartProvider = ({ children }) => {

  const [{cartItems, isCartOpen, cartCount,totalAmount}, dispatch] = useReducer(cartReducer, INITIAL_STATE);


  const updateCartItemsReducer = (newCartItems) => {

    const newCardCount = newCartItems.reduce((total, cartItem)=>{
      return total + cartItem.quantity

      
    },0)


    const newTotalAmount = newCartItems.reduce((total, cartItem)=>{
      return (total + cartItem.price) * cartItem.quantity

      
    },0)

    dispatch({type: 'SET_CART_ITEMS', 
      payload: { cartItems: newCartItems, totalAmount: newTotalAmount, cartCount: newCardCount}})


  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems); 
  }
  	 

  const addItemToCart = (productToAdd) => {

    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems); 
  }

  const removeItemX = (productToRemove) =>  {
    const newCartItems = removeX(cartItems,productToRemove);
    updateCartItemsReducer(newCartItems); 
  }

  const setIsCartOpen = (bool) => {
    dispatch({type: 'SET_IS_CART_OPEN', payload: bool })
  }
  	 

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, totalAmount, removeItemFromCart, removeItemX };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};