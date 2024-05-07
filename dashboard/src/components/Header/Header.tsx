import { useLocation } from "react-router-dom";

/**
 * Type for Header component props
 */
type HeaderProps = {
  /** Optional title for the header */
  title?: string;
};

/**
 * Header component
 * @param {HeaderProps} props - The props for the Header component
 * @returns JSX.Element
 */
const Header: React.FC<HeaderProps> = ({ title }) => {
  // Get the current location
  const location = useLocation();

  // Get the pathname from the location
  const pathname = location.pathname.substring(1);

  let pageTitle;
  // Determine the page title based on the pathname
  switch (pathname) {
    case 'dashboard':
      pageTitle = 'Dashboard';
      break;
    case 'order-history':
      pageTitle = 'Order History';
      break;
    case 'login':
      pageTitle = ' User Login';
      break;
    case 'sign-in':
      pageTitle = 'Create Account';
      break;
    default:
      pageTitle = 'Login';
  }

  // Use the provided title or the determined page title
  const displayTitle = title || pageTitle;

  return (
    <header className="p-1 h-16 border-b-2 border-white flex justify-center items-center w-1/2 mx-auto overflow-hidden text-3xl">
      {displayTitle}
    </header>
  );
};

export default Header;
