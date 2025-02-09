import styles from "./styles.module.scss";

export default function Title({ title, icon: Icon }) {
  return (
    <div className={styles.title}>
      <Icon />
      <h2>{title}</h2>
    </div>
  );
}
