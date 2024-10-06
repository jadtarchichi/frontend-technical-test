import { jwtDecode } from "jwt-decode";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCookie, setCookie } from "../helpers/cookies";
import { useUser } from "../services/tanstack/useUser";

export type AuthenticationState =
  | {
    isAuthenticated: true;
    token: string;
    userId: string;
  }
  | {
    isAuthenticated: false;
  };

export type Authentication = {
  state: AuthenticationState;
  authenticate: (token: string) => void;
  signout: () => void;
};

export const AuthenticationContext = createContext<Authentication | undefined>(
  undefined,
);

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {

  const [state, setState] = useState<AuthenticationState>({
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check the validity of the token cookie
    const tokenCookie = getCookie("token")

    // if token exist, set the authentication state
    if (tokenCookie) {
      const authenticationState = {
        isAuthenticated: true,
        token: tokenCookie,
        userId: jwtDecode<{ id: string }>(tokenCookie).id,
      }
      setState(authenticationState)
    }
  }, [])

  const authenticate = useCallback(
    (token: string) => {
      // Set the token cookie for one hours
      setCookie("token", token, 1)

      setState({
        isAuthenticated: true,
        token,
        userId: jwtDecode<{ id: string }>(token).id,
      });
    },
    [setState],
  );

  const signout = useCallback(() => {
    setState({ isAuthenticated: false });
    setCookie("token", "", 0)
  }, [setState]);

  const contextValue = useMemo(
    () => ({ state, authenticate, signout }),
    [state, authenticate, signout],
  );

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export function useAuthentication() {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider",
    );
  }
  return context;
}

export function useAuthToken() {
  const { state } = useAuthentication();
  if (!state.isAuthenticated) {
    throw new Error("User is not authenticated");
  }
  return state.token;
}

export function useAuthCurrentUser() {
  const { state } = useAuthentication();
  if (!state.isAuthenticated) {
    throw new Error("User is not authenticated");
  }
  const { data } = useUser(state.userId)
  return data;
}
