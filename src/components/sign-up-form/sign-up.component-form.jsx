import { useState } from 'react';
import FormInput from '../../components/form-input/form-input.component.jsx'
import Button from '../../components/button/button.component.jsx'

// import {UserContext} from '../../contexts/user.context'

import './sign-up.styles.scss'

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.jsx'


const DefaultformFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: ''


}

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(DefaultformFields);
	const { displayName, email, password, confirmPassword } = formFields;
	// const { setCurrentUser } = useContext(UserContext);
	// console.log(formFields);

	const resetFormFields = () => {
		setFormFields(DefaultformFields)
	}

	const handleSubmit = async(event)=> {
		event.preventDefault();
		//confirm pw match
		if(password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}
		try {
			const {user} = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName })
			// setCurrentUser(user);

			// console.log(response);
			resetFormFields();

		}catch (error) {
			if (error.code === 'auth/email-already-in-use'){
				alert('Cannot Create user! email already in use!');
			} else 
			console.log('error');

		}
		//see if we have authenticated from email and password

	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({...formFields,[name]: value})

	};
	return (
		<div className="sign-up-container">
			<h2>Don't have an Account?</h2>
			<span>Sign Up with your email and password</span>
			<form onSubmit={handleSubmit} >
				<FormInput label="Display Name" 
				type="text" 
				required 
				onChange={handleChange} 
				name="displayName" 
				value={displayName} />

				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

				<FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}  />

				<FormInput label="Confirm Password"  type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
				<Button type="submit" children="Sign Up"/>
			</form>
		</div>


		)
}

export default SignUpForm;