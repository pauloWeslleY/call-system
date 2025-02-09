import { Link } from "react-router";
import { useSignUp } from "./hooks/useSignUp";

import styles from "./styles.module.scss";
import logo from "../../assets/logo.png";

export default function SignUp() {
  const {
    name,
    email,
    password,
    isPendingSignUp,
    validateFormSignUp,
    onErrorMessageFormSignUp,
    handlerSignUp,
    onChangeInputName,
    onChangeInputEmail,
    onChangeInputPassword,
  } = useSignUp();

  return (
    <div className={styles.container}>
      <div className={styles.signUpWrapper}>
        <div className={styles.formLogoSignUp}>
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form autoComplete="off" onSubmit={handlerSignUp}>
          <h1>Cadastrar</h1>

          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={onChangeInputName}
          />

          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={onChangeInputEmail}
          />

          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={onChangeInputPassword}
          />

          <button type="submit" disabled={isPendingSignUp}>
            {isPendingSignUp ? "Carregando..." : "Cadastrar"}
          </button>

          {validateFormSignUp && (
            <div className={styles.formAlertSignUp}>
              <span>{onErrorMessageFormSignUp}</span>
            </div>
          )}
        </form>

        <div className={styles.formFooterSignUp}>
          <span>Já possui uma conta ?</span>
          <Link to="/sign-in">Faça Login</Link>
        </div>
      </div>
    </div>
  );
}
