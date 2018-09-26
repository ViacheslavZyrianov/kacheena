import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDDtcnEJr-_BhYixzJUDVlwY2hak8dE_rg',
    authDomain: 'kacheena-b192a.firebaseapp.com',
    databaseURL: 'https://kacheena-b192a.firebaseio.com',
    projectId: 'kacheena-b192a',
    storageBucket: 'kacheena-b192a.appspot.com',
    messagingSenderId: '989700309522'
  })
}
export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
