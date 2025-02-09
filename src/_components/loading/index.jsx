import styles from "./styles.module.scss";

export default function Loading(props) {
  return (
    <div className={styles.backDropLoading}>
      <div className={styles.backDropContainer}>
        <span>{props.message}</span>
      </div>
    </div>
  );
}
