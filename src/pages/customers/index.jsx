import { UsersRoundIcon } from "lucide-react";
import { useCustomers } from "./hooks/useCustomers";
import Title from "../../_components/title";

import styles from "./styles.module.scss";

export default function Customers() {
  const {
    cnpj,
    address,
    tradeName,
    isErrorCreateCustomer,
    isPendingCreateCustomer,
    onErrorMessageCreateCustomer,
    onChangeCNPJ,
    onChangeTradeName,
    onChangeAddress,
    handleCreateCustomer,
  } = useCustomers();

  return (
    <div className={styles.customersContainer}>
      <Title title="Clientes" icon={UsersRoundIcon} />

      <div className={styles.formCustomersWrapper}>
        <form onSubmit={handleCreateCustomer}>
          <div className={styles.formControlCustomers}>
            <div className={styles.formGroupCustomer}>
              <label>Nome Fantasia</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                value={tradeName}
                onChange={onChangeTradeName}
              />
            </div>

            <div className={styles.formGroupCustomer}>
              <label>CNPJ</label>
              <input
                type="text"
                placeholder="Digite seu CNPJ"
                value={cnpj}
                onChange={onChangeCNPJ}
              />
            </div>

            <div className={styles.formGroupCustomer}>
              <label>Endereço</label>
              <input
                type="text"
                placeholder="Digite seu email"
                value={address}
                onChange={onChangeAddress}
              />
            </div>
          </div>

          <button type="submit">
            {isPendingCreateCustomer ? "Processando..." : "Cadastrar"}
          </button>
        </form>

        {isErrorCreateCustomer && (
          <span className={styles.alertCreateCustomer}>
            {onErrorMessageCreateCustomer}
          </span>
        )}
      </div>
    </div>
  );
}
