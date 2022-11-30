import { initializeApp } from 'firebase/app';
import { getAuth, 
signInWithRedirect, 
signInWithPopup, 
GoogleAuthProvider, 
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,

 } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore';

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
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth, provider);

// we need to create the db
export const db = getFirestore();

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());



//this was the way with context, now we switch to redux
    // const categoryMap = querySnapshot.docs
  // .reduce((acc, docSnapshot)=>{
  //   const { title, items} = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;

  //   return acc;
  // },{});

  // return categoryMap;

}

// tell firebase if we want to get or set a document
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
	if (!userAuth) return;
	// we want some function that takes the data we were getting from the authentification 
	// and were gonna store that in our firestore
  const userDocRef = doc(db, 'users', userAuth.uid);
	// takes 3 args: database, collection (usersr), identifier that tells it what it was 


	// now to get the data
	  const userSnapshot = await getDoc(userDocRef);

	// first check if user data exist (exists gives a true/falst)
		  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
	//if user doesnt esist 
	//create / set the document with the data from userAuth in my collection 
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }




	// return userdocref
		return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);


}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);


}
export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);