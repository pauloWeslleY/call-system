import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router";
import ticketServices from "../../../services/ticket/ticket.services";
import TicketStatus from "../../../constants/ticket-status";

export function useDashboard() {
  const [tickets, setTickets] = useState([]);
  const [ticketDetail, setTicketDetail] = useState(null);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [openModalTicket, setOpenModalTicket] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const ticketId = searchParams.get("ticketId");

  const loadTableTickets = useCallback(async () => {
    setIsLoadingTickets(true);
    try {
      const response = await ticketServices.getAll();
      setTickets(response);
    } catch (error) {
      setIsLoadingTickets(false);
      throw new Error(error);
    } finally {
      setIsLoadingTickets(false);
    }
  }, []);

  const loadTicketDetail = useCallback(async () => {
    if (!ticketId) return;
    const response = await ticketServices.getId(ticketId);
    setTicketDetail(response);
  }, [ticketId]);

  useEffect(() => {
    loadTicketDetail();
  }, [loadTicketDetail]);

  useEffect(() => {
    loadTableTickets();
  }, [loadTableTickets]);

  const loadTableHeader = [
    "Cliente",
    "Assunto",
    "Status",
    "Cadastrado em",
    "Ações",
  ];

  const loadTickets = tickets.map((ticket) => ({
    ...ticket,
    createdAt: dayjs(ticket.createdAt).format("DD/MM/YYYY [ás] hh:mm:ss"),
  }));

  function verifyTicket(ticket) {
    const hasValidTicket = {
      Progresso: TicketStatus.PROGRESSO === ticket,
      Atendido: TicketStatus.ATENDIDO === ticket,
      Aberto: TicketStatus.ABERTO === ticket,
    };

    return hasValidTicket[ticket] ?? false;
  }

  function hasTableTickets() {
    return tickets.length !== 0;
  }

  function navigateUpdateTicket(ticketId) {
    navigate(`/dashboard/update-ticket/${ticketId}`);
  }

  function handleOpenModalTicket(ticketId) {
    return () => {
      setOpenModalTicket(true);

      setSearchParams((state) => {
        if (ticketId) {
          state.set("ticketId", ticketId);
        } else {
          state.delete("ticketId");
        }

        return state;
      });
    };
  }

  function handleCloseModalTicket() {
    setOpenModalTicket(false);
  }

  return {
    openModalTicket,
    tickets: loadTickets,
    ticketDetail,
    isLoadingTickets,
    loadTableHeader,
    verifyTicket,
    navigateUpdateTicket,
    hasTableTickets: hasTableTickets(),
    handleOpenModalTicket,
    handleCloseModalTicket,
  };
}
