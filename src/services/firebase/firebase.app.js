import { collection, getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export default class FirebaseApp {
  firebaseApp;

  constructor(firebaseApp) {
    this.firebaseApp = firebaseApp.initializeApp();
  }

  auth() {
    return getAuth(this.firebaseApp);
  }

  storage() {
    return getStorage(this.firebaseApp);
  }

  getDB() {
    return getFirestore(this.firebaseApp);
  }

  database() {
    return getDatabase(this.firebaseApp);
  }

  collection(path) {
    return collection(this.getDB(), path);
  }

  subCollection({ id, path, subCollection }) {
    return collection(this.getDB(), path, id, subCollection);
  }
}
