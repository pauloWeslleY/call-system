import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";

export function useSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister, isPending, validateForm, onErrorMessageForm } =
    useAuth();

  function onChangeInputName(event) {
    setName(event.target.value);
  }

  function onChangeInputEmail(event) {
    setEmail(event.target.value);
  }

  function onChangeInputPassword(event) {
    setPassword(event.target.value);
  }

  function validateInputsFormSignUp() {
    const hasInputs = !name && !email && !password;

    if (hasInputs) {
      alert("Preenchas os campos");
      return true;
    }

    return false;
  }

  async function handlerSignUp(event) {
    event.preventDefault();
    if (validateInputsFormSignUp()) return;

    await handleRegister({
      username: name,
      email: email,
      password: password,
    }).then(() => {
      setEmail("");
      setPassword("");
      setName("");
    });
  }

  return {
    name,
    email,
    password,
    handlerSignUp,
    onChangeInputName,
    onChangeInputEmail,
    onChangeInputPassword,
    isPendingSignUp: isPending,
    validateFormSignUp: validateForm,
    onErrorMessageFormSignUp: onErrorMessageForm,
  };
}
