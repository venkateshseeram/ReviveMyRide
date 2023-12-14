import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'
const firebaseConfig = {
  apiKey: 'AIzaSyB7qCGN6ylpnzfOJO6D1ujD5v_rwMfF_Oc',
  authDomain: 'revive-my-ride.firebaseapp.com',
  projectId: 'revive-my-ride',
  storageBucket: 'revive-my-ride.appspot.com',
  messagingSenderId: '670711920790',
  appId: '1:670711920790:web:952066571c07f3fc31aab7',
  measurementId: 'G-MC0RXW8V2M'
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const textDB = getFirestore(app)
const imageDB = getStorage(app)
const functions = getFunctions(app)
export { app, auth, textDB, imageDB, functions }
