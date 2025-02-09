import { useState } from "react";
import { useNavigate } from "react-router";
import { useTickets } from "../../../hooks/useTickets";
import ticketServices from "../../../services/ticket/ticket.services";

export function useCreateTicket() {
  const [customers, setCustomers] = useState("");
  const [complement, setComplement] = useState("");
  const [subject, setSubject] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [isPendingTickets, setIsPendingTickets] = useState(false);
  const {
    optionStatus,
    optionSubjectList,
    optionsCustomerList,
    formatDataTickets,
  } = useTickets();
  const navigate = useNavigate();

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

  function clearFormTickets() {
    setComplement("");
    setSubject("");
    setCustomers("");
  }

  async function handleRegisterTickets(event) {
    event.preventDefault();
    setIsPendingTickets(true);

    try {
      const addTickets = formatDataTickets({
        subject,
        complement,
        status,
        customer: customers,
      });

      await ticketServices.create({ ...addTickets });

      clearFormTickets();
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
    isPendingTickets,
    onChangeStatus,
    onChangeComplement,
    onChangeOptionSubject,
    onChangeOptionCustomers,
    handleRegisterTickets,
  };
}
