import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";

export function useSignIn() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, validateForm, onErrorMessageForm, handleLogin } =
    useAuth();

  const showLoadingSignIn = () => isSubmitting || isPending;

  function validFormSignIn() {
    if (errors.email || errors.password) {
      toast.warning("Preencha os campos");
      return true;
    }

    return false;
  }

  async function handleSignIn(data) {
    if (validFormSignIn()) return;

    try {
      await handleLogin({
        email: data.email,
        password: data.password,
      });
      reset();
    } catch {
      throw new Error("Algo de errado aconteceu");
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    handleSignIn,
    isPendingSignIn: showLoadingSignIn(),
    validateFormSignIn: validateForm,
    onErrorMessageFormSignIn: onErrorMessageForm,
  };
}
