import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, Firestore } from '@angular/fire/firestore';
import { getStorage, provideStorage, Storage } from '@angular/fire/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAevRoyCB5dykycW4PD4b6bYUFizFLuAn0",
    authDomain: "blog-ef2b7.firebaseapp.com",
    projectId: "blog-ef2b7",
    storageBucket: "blog-ef2b7.appspot.com",
    messagingSenderId: "127600341081",
    appId: "1:127600341081:web:602ec72f0d7f222fa20148" 
}



export const firebaseProviders = [
    provideFirebaseApp(() => initializeApp(firebaseConfig) as FirebaseApp),
    provideFirestore(() => getFirestore() as Firestore),
    provideStorage(() => getStorage() as Storage),
  ];


  export const appConfig= {
    
  };