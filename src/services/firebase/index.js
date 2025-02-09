import FirebaseApp from "./firebase.app";
import FirebaseInitApp from "./firebase.config";

function firebaseConnection() {
  const firebaseInitApp = new FirebaseInitApp();
  return new FirebaseApp(firebaseInitApp);
}

export const firebaseApp = firebaseConnection();
