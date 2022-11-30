import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { useSelector} from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';

// import {UserContext} from '../../contexts/user.context';
// import {CartContext} from '../../contexts/cart.context';
import {selectCurrentUser } from '../../store/user/user.selector'
import { signOutUser } from '../../utils/firebase/firebase.utils'
import {NavigationContainer, LogoContainer, NavLinks,NavLink} from './navigation.styles.jsx';

import { selectIsCartOpen } from '../../store/cart/cart.selector'


const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  // const { currentUser } = useContext(UserContext);
  // const { isCartOpen } = useContext(CartContext); 

  const isCartOpen = useSelector(selectIsCartOpen);

  return (

    <Fragment>

      <NavigationContainer> 
      <LogoContainer to="/">
        <CrwnLogo className="logo" />
      </LogoContainer>
      
        <NavLinks>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
              Sign Out
              </NavLink>
              
              ): ( <NavLink to="/auth">Sign-In</NavLink>)
          }
          <CartIcon />



        </NavLinks>
          {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet /> 
    </Fragment>

    )
} 

export default Navigation;