import classNames from "classnames";

import styles from "./styles.module.scss";
import TicketStatus from "../../constants/ticket-status";

export default function Badge({ ticket }) {
  return (
    <span
      className={classNames(styles.badge, {
        [styles.badgeProgress]: TicketStatus.PROGRESSO === ticket,
        [styles.badgeAttended]: TicketStatus.ATENDIDO === ticket,
        [styles.badgeOpened]: TicketStatus.ABERTO === ticket,
      })}
    >
      {ticket}
    </span>
  );
}
