import { createContext, useEffect, useReducer } from 'react' 

import {onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils'
//the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: ()=> null,

});


export const USER_ACTION_TYPES = {
	'SET_CURRENT_USER': 'SET_CURRENT_USER'
}

// reducer -- create a reducer
const userReducer = (state, action ) => {
	// console.log(action);
	const {type, payload} = action;

// inside you can give me a bunch of different cases
	switch(type) {
	case USER_ACTION_TYPES.SET_CURRENT_USER:
		return {
			...state,
			currentUser: payload
			}

	default:
	throw new Error(`unhandled type ${type} in userReducer`);

	}
}
const INITIAL_STATE	= {
	currentUser: null
}


export const UserProvider = ( { children } )=> {
	const [state, dispatch] = useReducer(userReducer,INITIAL_STATE);


	const {currentUser} = state

		// console.log(currentUser);

	const setCurrentUser = (user) => {
		dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
	}


	const value = {currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user ) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		})


		return unsubscribe;
	},[])

	//.provider wraps around any other compoenent that needs access to the context
	return <UserContext.Provider value={value} >{children}</UserContext.Provider>;

}