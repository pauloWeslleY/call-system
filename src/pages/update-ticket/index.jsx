import { PlusCircleIcon } from "lucide-react";
import { useUpdateTicket } from "./hooks/useUpdateTicket";
import Title from "../../_components/title";
import Loading from "../../_components/loading";

import styles from "./styles.module.scss";

export default function UpdateTicket() {
  const {
    status,
    subject,
    complement,
    customers,
    optionStatus,
    optionSubjectList,
    optionsCustomerList,
    isLoading,
    onChangeStatus,
    onChangeComplement,
    onChangeOptionSubject,
    onChangeOptionCustomers,
    handleUpdateTicket,
  } = useUpdateTicket();

  if (isLoading) {
    return <Loading message="Carregando..." />;
  }

  return (
    <div>
      <Title title="Editar Chamado" icon={PlusCircleIcon} />

      <div className={styles.createCallContainer}>
        <form onSubmit={handleUpdateTicket}>
          <div className={styles.formControlSelect}>
            <div className={styles.inputSelect}>
              <label htmlFor="customer">Cliente</label>

              <select
                id="customer"
                name="customer"
                value={customers}
                onChange={onChangeOptionCustomers}
              >
                <option value="">Selecione um Cliente</option>
                {optionsCustomerList.map((option) => {
                  return (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.inputSelect}>
              <label htmlFor="subject">Assunto</label>
              <select
                id="subject"
                name="subject"
                value={subject}
                onChange={onChangeOptionSubject}
              >
                <option value="">Selecione um assunto</option>
                {optionSubjectList.map((option) => {
                  return (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={styles.inputRadioStatus}>
            <label htmlFor="radio">Status</label>

            <div className={styles.formControlWrapper}>
              {optionStatus.map((props, index) => {
                return (
                  <div key={index} className={styles.formControl}>
                    <input
                      type="radio"
                      name="radio"
                      value={props.value}
                      checked={status === props.value}
                      onChange={onChangeStatus}
                    />
                    <span>{props.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.formControlTextarea}>
            <label htmlFor="complement">Complemento</label>

            <textarea
              name="complement"
              placeholder="Descreva seu problema"
              value={complement}
              onChange={onChangeComplement}
            />
          </div>

          <button type="submit">Editar</button>
        </form>
      </div>
    </div>
  );
}
