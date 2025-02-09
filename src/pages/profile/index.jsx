import { FolderUpIcon, WrenchIcon } from "lucide-react";
import Title from "../../_components/title";

import styles from "./styles.module.scss";
import { useProfile } from "./hooks/useProfile";

export default function Profile() {
  const {
    email,
    username,
    verifyPhotoURL,
    isPendingProfile,
    handleLogout,
    handleChangeInputPhoto,
    handleChangeInputUsername,
    handleUpdateUseProfile,
  } = useProfile();

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Title title="Meu Perfil" icon={WrenchIcon} />
      </div>

      <div className={styles.formProfileWrapper}>
        <form onSubmit={handleUpdateUseProfile}>
          <label className={styles.profileInputAvatar}>
            <span>
              <FolderUpIcon />
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleChangeInputPhoto}
            />

            <img
              src={verifyPhotoURL}
              alt="Photo profile"
              width={250}
              height={250}
            />
          </label>

          <div className={styles.formControlProfile}>
            <div className={styles.formGroupProfile}>
              <label>Nome</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={username}
                onChange={handleChangeInputUsername}
              />
            </div>

            <div className={styles.formGroupProfile}>
              <label>Email</label>
              <input disabled value={email} />
            </div>

            <button type="submit" disabled={isPendingProfile}>
              {isPendingProfile ? "Carregando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>

      <div className={styles.footerBtnProfile}>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
