import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";

export function useSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isPending, validateForm, onErrorMessageForm, handleLogin } =
    useAuth();

  function onChangeInputSignInEmail(event) {
    setEmail(event.target.value);
  }

  function onChangeInputSignInPassword(event) {
    setPassword(event.target.value);
  }

  function validFormSignIn() {
    if (!email && !password) {
      toast.warning("Preencha os campos");
      return true;
    }

    return false;
  }

  async function handleSignIn(event) {
    event.preventDefault();
    if (validFormSignIn()) return;

    await handleLogin({ email, password }).then(() => {
      setEmail("");
      setPassword("");
    });
  }

  return {
    email,
    password,
    isPendingSignIn: isPending,
    validateFormSignIn: validateForm,
    onErrorMessageFormSignIn: onErrorMessageForm,
    handleSignIn,
    onChangeInputSignInEmail,
    onChangeInputSignInPassword,
  };
}
