import { createContext } from "react";

interface IContext {
  user: any | null;
  userData: any | null;
  setAppState: (state: any) => void;
}

const AppContext = createContext<IContext>({
  user: null,
  userData: null,
  setAppState: () => {}, 
});

export default AppContext;