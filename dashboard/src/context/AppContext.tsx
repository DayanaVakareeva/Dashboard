import { createContext } from "react";

/**
 * Interface for the context state
 */
interface IContext {
  /** User object or null */
  user: any | null;
  /** User data object or null */
  userData: any | null;
  /** Loading state */
  loading: boolean;
  /** Function to set the app state */
  setAppState: (state: any) => void;
}

/**
 * AppContext is the context object for the app. It provides a user object, user data,
 * a loading state, and a function to set the app state.
 */
const AppContext = createContext<IContext>({
  user: null,
  userData: null,
  loading: true,
  setAppState: () => {}, 
});

export default AppContext;