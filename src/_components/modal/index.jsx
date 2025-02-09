import { XCircle } from "lucide-react";
import styles from "./styles.module.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import Badge from "../badge";

export default function Modal({ data, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <h3>Detalhes do Chamado</h3>

          <button onClick={onClose}>
            <XCircle />
          </button>
        </div>

        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <span>Cliente:</span> <p>{data.customer.customer}</p>
          </div>

          <div className={styles.modalContent}>
            <span>Assunto:</span> <p>{data.subject}</p>
          </div>

          <div className={styles.modalContent}>
            <span>Status:</span> <Badge ticket={data.status} />
          </div>

          <div className={styles.modalContent}>
            <span>Cadastrado em:</span>{" "}
            <p>{dayjs(data.createdAt).format("DD/MM/YYYY [ás] hh:mm:ss")}</p>
          </div>

          {data.complement && (
            <div
              className={classNames(styles.modalContent, {
                [styles.modalComplement]: true,
              })}
            >
              <span>Complemento:</span>
              <p>{data.complement}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
