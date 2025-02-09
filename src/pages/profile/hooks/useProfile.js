import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import Avatar from "../../../assets/avatar.png";
import profileServices from "./profile.services";

export function useProfile() {
  const { user, setUser, handleLogout } = useAuth();
  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [prevFile, setPrevFile] = useState("");
  const [username, setUsername] = useState("");
  const [isPendingProfile, setIsPendingProfile] = useState(false);

  const loadCurrentUserProfile = useCallback(() => {
    if (!user) return;

    setPhoto(user.avatarURL);
    setUsername(user.username);
  }, [user]);

  useEffect(() => {
    loadCurrentUserProfile();
  }, [loadCurrentUserProfile]);

  function handleChangeInputUsername(event) {
    setUsername(event.target.value);
  }

  function verifyPhotoURL() {
    if (prevFile) return prevFile;
    return photo ?? Avatar;
  }

  function handleChangeInputPhoto(event) {
    if (!event.target.files) return;

    const fileSelected = event.target.files[0];
    const listTypeImage = ["image/jpeg", "image/png"].includes(
      fileSelected.type
    );

    if (!listTypeImage) {
      setImage(null);
      setPrevFile("");
    }

    setImage(fileSelected);
    setPrevFile(URL.createObjectURL(fileSelected));
  }

  async function handleUpdateUseProfile(event) {
    event.preventDefault();
    setIsPendingProfile(true);

    try {
      const profile = await profileServices.updated({
        username: username,
        avatarURL: image,
      });

      setUser(profile);
    } catch {
      setIsPendingProfile(false);
    } finally {
      setIsPendingProfile(false);
    }
  }

  return {
    image,
    photo,
    prevFile,
    username,
    email: user.email,
    isPendingProfile,
    verifyPhotoURL: verifyPhotoURL(),
    handleLogout,
    handleChangeInputPhoto,
    handleChangeInputUsername,
    handleUpdateUseProfile,
  };
}
