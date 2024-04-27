import { createContext } from "react";

interface IContext {
    user: any | null;
    userData: any | null;
  }
  
  export const AppContext = createContext<IContext>({
    user: null,
    userData: null
  });