import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { firebaseApp } from "../firebase";
import { storage } from "../cache";

const authenticationServices = {
  signIn: async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Preencha os campos");
    }

    try {
      const { user } = await signInWithEmailAndPassword(
        firebaseApp.auth(),
        email,
        password
      );

      const token = await user.getIdToken();

      const userData = {
        id: user.uid,
        username: user?.displayName,
        email: user?.email,
        accessToken: token,
        avatarURL: user.photoURL,
      };

      storage.save(userData);
      toast.success(
        `User ${userData.username.toUpperCase()} Authenticated Successfully`
      );
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  signUp: async ({ username, email, password }) => {
    if (!username || !email || !password) {
      throw new Error("Preencha os campos");
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        firebaseApp.auth(),
        email,
        password
      );

      const token = await user.getIdToken();

      await set(ref(firebaseApp.database(), `users/${user.uid}`), {
        username: username,
        email: email,
        avatarURL: user.photoURL,
      });

      await updateProfile(user, { displayName: username });

      const userData = {
        id: user?.uid,
        username: username,
        email: email,
        accessToken: token,
        avatarURL: user.photoURL,
      };

      storage.save(userData);
      toast.success(
        `User ${userData.username.toUpperCase()} Authenticated Successfully`
      );
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  signOut: async () => {
    try {
      await signOut(firebaseApp.auth());
      storage.clear();
      toast.success("User Logged Out Successfully");
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default authenticationServices;
