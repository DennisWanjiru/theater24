import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
  apiKey: 'AIzaSyC60IF5lmGPNoXsf4ezLmxqP4u_-ZEdEv4',
  authDomain: 'theater24-creez.firebaseapp.com',
  projectId: 'theater24-creez',
  storageBucket: 'theater24-creez.appspot.com',
  messagingSenderId: '1006962200598',
  appId: '1:1006962200598:web:1e4688377b0fc84da4a537'
}

export const firebaseApp = initializeApp({
  // your application settings
  ...firebaseConfig
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
