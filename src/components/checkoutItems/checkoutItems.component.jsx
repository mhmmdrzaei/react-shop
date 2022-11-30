// import { useContext } from 'react';

// import { CartContext } from '../../contexts/cart.context'

import {useDispatch, useSelector } from 'react-redux';



import {selectCartItems} from '../../store/cart/cart.selector';

import {addItemToCart, removeItemFromCart, clearItemFromCart} from '../../store/cart/cart.action';

import './checkoutItems.styles.scss'


const CheckoutItem = ({cartItem}) => {
	const dispatch = useDispatch()
	// const addItemToCart = dispatch(addItemToCart);
	// const removeItemFromCart = dispatch(removeItemFromCart);
	// const clearItemFromCart = dispatch(clearItemFromCart);
	const {name, quantity,imageUrl, price} = cartItem;
	const cartItems = useSelector(selectCartItems);
	return (
		<div className="checkout-item-container" >
			<div className='image-container'>
				<img src={imageUrl} alt={name} />
			</div>

			<span className="name">{name}</span>

			<span className="quantity">
			<div className="arrow" onClick={()=> dispatch(removeItemFromCart(cartItems,cartItem)) }>&#10094;</div>
			
			<span className="value">{quantity}</span>
			<div className="arrow" onClick={()=> dispatch(addItemToCart(cartItems,cartItem)) }>&#10095;</div>
			</span>
			<span className="price"> {`$${price}`}</span>
			<div className='remove-button' onClick={()=> dispatch(clearItemFromCart(cartItems, cartItem))}>&#10005;</div>

		</div>


		)
}
export default CheckoutItem;