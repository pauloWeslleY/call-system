import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/authentication-context";
import { useLocation, useNavigate } from "react-router";
import authenticationServices from "../services/authentication/authentication.services";

export function useAuth() {
  const {
    userAuthenticated,
    loadingAuth,
    user,
    error,
    isPending,
    setUser,
    setError,
    setIsPending,
  } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setError({});
  }, [pathname, setError]);

  function validateForm() {
    return error?.isError ?? false;
  }

  function onErrorMessageForm() {
    return error?.error ?? "Ops, Algo de errado aconteceu!";
  }

  async function handleLogin({ email, password }) {
    setIsPending(true);

    try {
      const userAuth = await authenticationServices.signIn({ email, password });
      setUser(userAuth);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError({ isError: true, error: err.message });
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  }

  async function handleRegister(data) {
    setIsPending(true);

    try {
      const userAuth = await authenticationServices.signUp({ ...data });
      setUser(userAuth);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError({ isError: true, error: err.message });
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  }

  async function handleLogout() {
    setIsPending(true);

    try {
      await authenticationServices.signOut();
      navigate("/sign-in", { replace: true });
    } catch (error) {
      setError({ isError: true, error: error.message });
    } finally {
      setIsPending(false);
    }
  }

  return {
    user,
    userAuthenticated,
    loadingAuth,
    isPending,
    handleLogin,
    handleLogout,
    handleRegister,
    setUser,
    validateForm: validateForm(),
    onErrorMessageForm: onErrorMessageForm(),
  };
}
