import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTickets } from "../../../hooks/useTickets";
import ticketServices from "../../../services/ticket/ticket.services";

export function useUpdateTicket() {
  const [customers, setCustomers] = useState("");
  const [complement, setComplement] = useState("");
  const [subject, setSubject] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [ticketDetail, setTicketDetail] = useState(null);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const [isPendingTickets, setIsPendingTickets] = useState(false);
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const {
    optionStatus,
    optionSubjectList,
    optionsCustomerList,
    formatDataTickets,
  } = useTickets();

  const loadTicketDetail = useCallback(async () => {
    setIsLoadingTickets(true);

    if (!ticketId) {
      setIsLoadingTickets(false);
      return;
    }

    try {
      const response = await ticketServices.getId(ticketId);
      setCustomers(response.customer.customerId);
      setComplement(response.complement);
      setSubject(response.subject);
      setStatus(response.status);
      setTicketDetail(response);
    } catch {
      setIsLoadingTickets(false);
    } finally {
      setIsLoadingTickets(false);
    }
  }, [ticketId]);

  useEffect(() => {
    loadTicketDetail();
  }, [loadTicketDetail]);

  function onChangeComplement(event) {
    setComplement(event.target.value);
  }

  function onChangeStatus(event) {
    setStatus(event.target.value);
  }

  function onChangeOptionSubject(event) {
    setSubject(event.target.value);
  }

  function onChangeOptionCustomers(event) {
    setCustomers(event.target.value);
  }

  function hasLoading() {
    return isLoadingTickets || isPendingTickets;
  }

  async function handleUpdateTicket(event) {
    event.preventDefault();
    setIsPendingTickets(true);

    try {
      const updateTickets = formatDataTickets({
        subject,
        complement,
        status,
        customer: customers,
        createdAt: ticketDetail.createdAt,
        updatedAt: new Date().toISOString(),
      });

      const response = await ticketServices.update(ticketId, {
        ...updateTickets,
      });
      setCustomers(response.customer.customerId);
      setComplement(response.complement);
      setSubject(response.subject);
      setStatus(response.status);
      navigate("/dashboard/home");
    } catch (error) {
      setIsPendingTickets(false);
      throw new Error(error.message);
    } finally {
      setIsPendingTickets(false);
    }
  }

  return {
    status,
    subject,
    customers,
    complement,
    optionStatus,
    optionSubjectList,
    optionsCustomerList,
    isLoading: hasLoading(),
    onChangeStatus,
    onChangeComplement,
    onChangeOptionSubject,
    onChangeOptionCustomers,
    handleUpdateTicket,
  };
}
