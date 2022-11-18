import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import FormInput from '../../components/form-input/form-input.component.jsx'
import Button from '../../components/button/button.component.jsx'
import './sign-in-form.styles.scss'
import { auth, 
signInWithGooglePopup, 
signInWithGoogleRedirect, 
createUserDocumentFromAuth,
signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';


// import {  } from '../../utils/firebase/firebase.utils.jsx'


const DefaultformFields = {
	email: '',
	password: ''


}

const SignInForm = () => {
	const [formFields, setFormFields] = useState(DefaultformFields);
	const {  email, password } = formFields;
	// console.log(formFields);

	const resetFormFields = () => {
		setFormFields(DefaultformFields)
	}
	const signInWithGoogle =  async() => {
		const {user} = await signInWithGooglePopup();
		
		const userDocRef = await createUserDocumentFromAuth(user);
	}
	const signInWithGoogleRedirect = useEffect(() => {
	  async function fetchData() {
	    // You can await here
	    const response = await getRedirectResult(auth);
	    console.log(response);	  
	    if(response) {
	    	const userDocRef = await createUserDocumentFromAuth(response.user);

	    }

	}
	  fetchData();
	}, [])

	const handleSubmit = async(event)=> {
		event.preventDefault();
		//confirm pw match
		try {
			const response = await signInAuthUserWithEmailAndPassword(email,password);
			console.log(response);
			resetFormFields();

		}catch (error) {
			switch(error.code){
			case 'auth/wrong-password':
				alert('Username and Password do not match! try again');
			break
			case 'auth/user-not-found':
				alert('User Not Found! please sign up first!');
				break
			default:
				console.log('error logging in the user', error.message);
			}
			// if(error.code === "auth/wrong-password") {
			// 	alert('Username and Password do not match! try again');
			// }
			// else if(error.code === "auth/user-not-found") {
			// 	alert('User Not Found! please sign up first!');
			// }
			
		}
		//see if we have authenticated from email and password

	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({...formFields,[name]: value})


	};
	return (
		<div className="sign-up-container">
			<h2>Already Have an Account? </h2>
			<span>Sign In with your email and password</span>
			<form onSubmit={handleSubmit} >

				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

				<FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}  />
				<div className="buttons-container">
					<Button type="submit" children="Sign In"/>
					<Button type='button' onClick={signInWithGoogle} buttonType="google"children="Sign In with Google Pop Up" />
					<Button type='button' onClick={signInWithGoogleRedirect} buttonType="google"children="Sign In with Google Re-Direct" />
				</div>
				

			</form>

		</div>


		)
}

export default SignInForm;