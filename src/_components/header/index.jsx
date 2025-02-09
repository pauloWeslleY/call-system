import { NavLink } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { loadNavMenu } from "./nav-menu-list";
import AvatarIMG from "../../assets/avatar.png";
import styles from "./styles.module.scss";

const navActiveColor = "#2973B2";

export default function Header() {
  const { user } = useAuth();
  const validUserAvatarURL = user.avatarURL ?? AvatarIMG;

  return (
    <div className={styles.sidebar}>
      <div className={styles.bannerProfile}>
        <img src={validUserAvatarURL} alt="Foto do usuário" />
      </div>

      <div className={styles.sidebarMenu}>
        {loadNavMenu.map((navItem) => {
          const { path, label, icon: Icon } = navItem;

          return (
            <NavLink
              key={path}
              to={path}
              style={(active) => ({
                color: active.isActive ? navActiveColor : "inherit",
              })}
            >
              <Icon />
              {label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
