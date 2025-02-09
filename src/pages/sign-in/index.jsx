import { Link } from "react-router";

import logo from "../../assets/logo.png";
import styles from "./styles.module.scss";
import { useSignIn } from "./hooks/useSignIn";
import RegexValidation from "../../constants/regex-validation";
import classNames from "classnames";

export default function SignIn() {
  const {
    errors,
    register,
    isPendingSignIn,
    validateFormSignIn,
    onErrorMessageFormSignIn,
    handleSubmit,
    handleSignIn,
  } = useSignIn();

  return (
    <div className={styles.container}>
      <div className={styles.signInWrapper}>
        <div className={styles.formLogoSignIn}>
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form autoComplete="off" onSubmit={handleSubmit(handleSignIn)}>
          <h1>Entrar</h1>

          <div className={styles.formControl}>
            <input
              {...register("email", {
                required: "Informe seu e-mail",
                pattern: {
                  value: RegexValidation.EMAIL,
                  message: "Formato de e-mail inválido",
                },
              })}
              id="email"
              type="email"
              placeholder="email@email.com"
            />
            {errors.email && (
              <span className={styles.formStateError}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.formControl}>
            <input
              {...register("password", {
                required: "Informe sua senha",
              })}
              id="password"
              type="password"
              placeholder="***********"
            />
            {errors.password && (
              <span className={styles.formStateError}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={classNames(styles.buttonSignIn, {
              [styles.buttonSignInLoading]: isPendingSignIn,
            })}
            disabled={isPendingSignIn}
          >
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
