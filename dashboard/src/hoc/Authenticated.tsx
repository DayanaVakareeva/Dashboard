import { useContext, ReactNode } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

/**
 * `AuthenticatedProps` is an interface that defines the shape of the props for the `Authenticated` component.
 * It has a `children` property of type `ReactNode`.
 */
interface AuthenticatedProps {
    children: ReactNode;
  }
  /**
 * `Authenticated` is a component that checks if a user is authenticated.
 * If the user is not authenticated, it redirects them to the login page.
 * If the user is authenticated, it renders the `children` prop.
 *
 * @param {ReactNode} children - The child components to render if the user is authenticated.
 * @returns {ReactElement} A `Navigate` component if the user is not authenticated, or the `children` prop if the user is authenticated.
 */
  export default function Authenticated({ children }: AuthenticatedProps) {
    const { user } = useContext(AppContext);
    const location = useLocation();
  
    if (!user) {
      return <Navigate replace to="/login" state={{ from: location }} />
    }
  
    return (
      <>
        {children}
      </>
    )
  }