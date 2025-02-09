import { ref, update } from "firebase/database";
import { toast } from "react-toastify";
import { firebaseApp } from "../../../services/firebase";
import { updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  uploadBytes,
  ref as storageRef,
} from "firebase/storage";
import { storage } from "../../../services/cache";

async function uploadPhoto({ imageRef, file }) {
  try {
    const uploadRef = storageRef(firebaseApp.storage(), imageRef);
    const upload = await uploadBytes(uploadRef, file);
    return await getDownloadURL(upload.ref);
  } catch (error) {
    toast.warn("Não foi possível atualizar a foto!");
    throw new Error("Upload failed: " + error.message);
  }
}

const profileServices = {
  updated: async (dataProfile) => {
    const currentUser = firebaseApp.auth().currentUser;
    const hasValidDataEquals = currentUser.displayName === dataProfile.username;

    if (hasValidDataEquals && !dataProfile.avatarURL) {
      toast.warn("Dados Iguais");
      throw new Error("Dados Iguais");
    }

    let imageURL;

    if (dataProfile.avatarURL) {
      imageURL = await uploadPhoto({
        imageRef: `users/${currentUser.uid}/${dataProfile.username}`,
        file: dataProfile.avatarURL,
      });
    }

    try {
      if (!currentUser) {
        throw new Error("Usuário não encontrado");
      }

      const accessToken = await currentUser.getIdToken();
      const validAvatarURL = imageURL || currentUser.photoURL;

      await update(ref(firebaseApp.database(), `users/${currentUser.uid}`), {
        username: dataProfile.username,
        avatarURL: validAvatarURL,
      });

      await updateProfile(currentUser, {
        displayName: dataProfile.username,
        photoURL: validAvatarURL,
      });

      const userUpdatedProfile = {
        id: currentUser.uid,
        email: currentUser.email,
        username: dataProfile.username,
        avatarURL: validAvatarURL,
        accessToken: accessToken,
      };

      storage.save(userUpdatedProfile);
      toast.success("Registro atualizado com sucesso!");
      return userUpdatedProfile;
    } catch (error) {
      toast.error("Erro ao atualizar registro: ", error.message);
    }
  },
};

export default profileServices;
