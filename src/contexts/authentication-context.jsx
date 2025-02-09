import { createContext, useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../services/firebase";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState(null);

  const loadUserAuthenticated = useCallback(() => {
    const auth = firebaseApp.auth();

    onAuthStateChanged(auth, async (userAuth) => {
      if (!userAuth) {
        setLoadingAuth(false);
        return;
      }

      const token = await userAuth.getIdToken();

      const userAuthenticated = {
        id: userAuth.uid,
        username: userAuth.displayName ?? "SEM DADOS",
        email: userAuth.email ?? "SEM DADOS",
        avatarURL: userAuth.photoURL,
        accessToken: token,
      };

      setUser(userAuthenticated);
      setLoadingAuth(false);
    });
  }, []);

  useEffect(() => {
    loadUserAuthenticated();
  }, [loadUserAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated: !!user?.accessToken,
        loadingAuth,
        user,
        error,
        isPending,
        setUser,
        setError,
        setIsPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
