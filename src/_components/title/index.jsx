import { memo } from "react";
import styles from "./styles.module.scss";

const Title = memo(({ title, icon: Icon }) => {
  return (
    <div className={styles.title}>
      <Icon />
      <h2>{title}</h2>
    </div>
  );
});

Title.displayName = "Title";
export default Title;
