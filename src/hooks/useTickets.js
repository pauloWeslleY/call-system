import { useCallback, useEffect, useState } from "react";
import { getCustomers } from "../services/customers/customer.services";
import { useAuth } from "./useAuth";

export function useTickets() {
  const [selectCustomers, setSelectCustomers] = useState([]);
  const { user } = useAuth();

  const loadSelectCustomers = useCallback(async () => {
    const loadCustomers = await getCustomers();
    setSelectCustomers(loadCustomers);
  }, []);

  useEffect(() => {
    loadSelectCustomers();
  }, [loadSelectCustomers]);

  const optionsCustomerList = selectCustomers.map((customer) => ({
    id: customer.id,
    value: customer.id,
    label: customer.tradeName,
  }));

  const optionSubjectList = [
    { value: "Suporte", label: "Suporte" },
    { value: "Visita técnica", label: "Visita técnica" },
    { value: "Financeiro", label: "Financeiro" },
  ];

  const optionStatus = [
    { value: "Aberto", label: "Em Aberto" },
    { value: "Progresso", label: "Progresso" },
    { value: "Atendido", label: "Atendido" },
  ];

  function getCustomer(customers) {
    return optionsCustomerList.find((client) => client.id === customers);
  }

  const formatDataTickets = (data) => ({
    subject: data.subject,
    complement: data.complement,
    status: data.status,
    userId: user.id,
    customer: {
      customer: getCustomer(data.customer).label,
      customerId: getCustomer(data.customer).id,
    },
    createdAt: data.createdAt ?? new Date().toISOString(),
    updatedAt: data.updatedAt ?? null,
  });

  return {
    optionStatus,
    optionSubjectList,
    optionsCustomerList,
    formatDataTickets,
  };
}
