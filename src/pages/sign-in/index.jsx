import { Link } from "react-router";

import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";
import { useSignIn } from "./hooks/useSignIn";

export default function SignIn() {
  const {
    email,
    password,
    isPendingSignIn,
    validateFormSignIn,
    onErrorMessageFormSignIn,
    onChangeInputSignInEmail,
    onChangeInputSignInPassword,
    handleSignIn,
  } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.signInWrapper}>
        <div className={styles.formLogoSignIn}>
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form autoComplete="off" onSubmit={handleSignIn}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={onChangeInputSignInEmail}
          />

          <input
            type="password"
            placeholder="***********"
            value={password}
            onChange={onChangeInputSignInPassword}
          />

          <button type="submit" disabled={isPendingSignIn}>
            {isPendingSignIn ? "Carregando..." : "Acessar"}
          </button>

          {validateFormSignIn && (
            <div className={styles.formAlertSignIn}>
              <span>{onErrorMessageFormSignIn}</span>
            </div>
          )}
        </form>

        <div className={styles.formFooterSignIn}>
          <span>Ainda não possui uma conta ?</span>
          <Link to="/sign-up">Cadastrar</Link>
        </div>
      </div>
    </div>
  );
}
