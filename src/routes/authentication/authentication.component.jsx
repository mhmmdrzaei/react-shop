import SignUpForm from '../../components/sign-up-form/sign-up.component-form.jsx';
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';
import './authentication.styles.scss';
const Authentication = ()=> {

 return (
 	<div className="authentication-container">
 	 <SignInForm />
 	<SignUpForm />

 	</div>
 	

 	)
}
export default Authentication; 