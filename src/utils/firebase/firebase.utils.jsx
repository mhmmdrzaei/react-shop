import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRPFIT9W4tKgd7dTAT0n4A3jb7I7aKpWk",
  authDomain: "crwn-clothing-db-59a19.firebaseapp.com",
  projectId: "crwn-clothing-db-59a19",
  storageBucket: "crwn-clothing-db-59a19.appspot.com",
  messagingSenderId: "113216150754",
  appId: "1:113216150754:web:501afe0cb425d9691392bb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// we need to create the db
export const db = getFirestore();

// tell firebase if we want to get or set a document
export const createUserDocumentFromAuth = async (userAuth) => {
	// we want some function that takes the data we were getting from the authentification 
	// and were gonna store that in our firestore
	const userDocRef = doc(db, 'users', userAuth.uid);
	// takes 3 args: database, collection (usersr), identifier that tells it what it was 


	// now to get the data
	const userSnapshot = await getDoc(userDocRef);
		console.log(userSnapshot);


}