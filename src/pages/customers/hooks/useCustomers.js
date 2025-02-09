import { useState } from "react";
import customersServices from "./customers.services";

export function useCustomers() {
  const [cnpj, setCnpj] = useState("");
  const [address, setAddress] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [isPendingCreateCustomer, setIsPendingCreateCustomer] = useState(false);
  const [errorCreateCustomer, setErrorCreateCustomer] = useState(null);

  function onChangeTradeName(event) {
    setTradeName(event.target.value);
  }

  function onChangeCNPJ(event) {
    setCnpj(event.target.value);
  }

  function onChangeAddress(event) {
    setAddress(event.target.value);
  }

  function clearFormCreateCustomer() {
    setCnpj("");
    setAddress("");
    setTradeName("");
  }

  function onErrorMessageCreateCustomer() {
    return (
      errorCreateCustomer?.error ?? "Ops! Não foi possível cadastrar um cliente"
    );
  }

  async function handleCreateCustomer(event) {
    setIsPendingCreateCustomer(true);
    event.preventDefault();

    try {
      const newDataCustomer = {
        tradeName,
        cnpj,
        address,
        createdAt: new Date().toISOString(),
      };

      await customersServices.create({ ...newDataCustomer });
      clearFormCreateCustomer();
      setErrorCreateCustomer(null);
    } catch (error) {
      setErrorCreateCustomer({ isError: true, error: error.message });
      setIsPendingCreateCustomer(false);
      return;
    } finally {
      setIsPendingCreateCustomer(false);
    }
  }

  return {
    cnpj,
    address,
    tradeName,
    onChangeCNPJ,
    onChangeAddress,
    onChangeTradeName,
    handleCreateCustomer,
    isPendingCreateCustomer,
    isErrorCreateCustomer: errorCreateCustomer?.isError,
    onErrorMessageCreateCustomer: onErrorMessageCreateCustomer(),
  };
}
