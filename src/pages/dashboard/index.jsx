import { Link } from "react-router";
import {
  Edit3Icon,
  MessageCircleIcon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";
import classNames from "classnames";
import Title from "../../_components/title";
import styles from "./styles.module.scss";
import Modal from "../../_components/modal";
import { useDashboard } from "./hooks/useDashboard";
import Loading from "../../_components/loading";
import Badge from "../../_components/badge";

export default function Dashboard() {
  const {
    tickets,
    isLoadingTickets,
    hasTableTickets,
    loadTableHeader,
    ticketDetail,
    openModalTicket,
    navigateUpdateTicket,
    handleOpenModalTicket,
    handleCloseModalTicket,
  } = useDashboard();

  return (
    <div className={styles.dashboardContainer}>
      <Title title="Chamados" icon={MessageCircleIcon} />

      <div className={styles.dashboardContent}>
        <Link to="/dashboard/create-ticket">
          <PlusCircleIcon />
          Novo Chamado
        </Link>

        {isLoadingTickets && <Loading message="Carregando..." />}

        {!hasTableTickets && (
          <div className={styles.tableTicketsEmpty}>
            <span>Nenhum chamado cadastrado!</span>
          </div>
        )}

        {!isLoadingTickets && hasTableTickets && (
          <>
            <table>
              <thead>
                <tr>
                  {loadTableHeader.map((header, index) => {
                    return (
                      <th key={index} scope="col">
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {tickets?.map((ticket) => {
                  return (
                    <tr key={ticket.id}>
                      <td data-label="Cliente">{ticket.customer.customer}</td>
                      <td data-label="Assunto">{ticket.subject}</td>
                      <td data-label="Status">
                        <Badge ticket={ticket.status} />
                      </td>
                      <td data-label="Cadastrado">{ticket.createdAt}</td>
                      <td data-label="Ações" className={styles.tableActions}>
                        <div className={styles.actions}>
                          <button
                            onClick={handleOpenModalTicket(ticket.id)}
                            className={classNames({
                              [styles.iconButtonTable]: true,
                              [styles.iconButtonEdit]: true,
                            })}
                          >
                            <SearchIcon />
                          </button>

                          <button
                            onClick={() => navigateUpdateTicket(ticket.id)}
                            className={classNames({
                              [styles.iconButtonTable]: true,
                              [styles.iconButtonSearch]: true,
                            })}
                          >
                            <Edit3Icon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      {openModalTicket && (
        <Modal data={ticketDetail} onClose={handleCloseModalTicket} />
      )}
    </div>
  );
}
