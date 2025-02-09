import { initializeApp } from "firebase/app";

const firebaseConfig = () => ({
  apiKey: "AIzaSyD1XVSV6mdFhAlg8Uez5nTwph_Wg8bjqog",
  authDomain: "e-commerce-9ad1c.firebaseapp.com",
  databaseURL: "https://e-commerce-9ad1c-default-rtdb.firebaseio.com",
  projectId: "e-commerce-9ad1c",
  storageBucket: "e-commerce-9ad1c.appspot.com",
  messagingSenderId: "319648510361",
  appId: "1:319648510361:web:394d7a039e835f37f26308",
  measurementId: "G-FL9MEL83HK",
});

export default class FirebaseInitApp {
  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    const app = initializeApp(firebaseConfig());
    return app;
  }
}
