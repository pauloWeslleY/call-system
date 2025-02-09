import { LoaderIcon } from "lucide-react";
import styles from "./styles.module.scss";

export default function Loading(props) {
  return (
    <div className={styles.backDropLoading}>
      <div className={styles.backDropContainer}>
        <LoaderIcon />
        <span>{props.message}</span>
      </div>
    </div>
  );
}
