import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Login from './views/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar';
import Order from './components/Order/Order';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import Footer from './components/Footer/Footer';
import OrderHistory from './views/OrderHistory/OrderHistory';
import AppContext from './context/AppContext';
import Dashboard from './views/MainDashboard/MainDashboard';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn/SignIn';

/**
 * App component
 *
 * This is the root component of the application. It handles user authentication and routing.
 *
 * State:
 * - appState: { user: User | null, userData: any | null } - The current user and their data.
 * - isOrderFormOpen: boolean - Whether the order form is currently open.
 *
 * Context:
 * - AppContext: { user: User | null, userData: any | null } - Provides the current user and their data to the rest of the application.
 *
 * Effects:
 * - On mount, subscribes to auth state changes. If a user is signed in, it updates appState.user with the user. If a user is signed out, it updates appState.user to null. Cleans up the subscription on unmount.
 *
 * Returns:
 * - If a user is signed in, returns a layout with a sidebar, header, order form, and routes for the dashboard and order history.
 * - If no user is signed in, returns the Login view.
 */
function App() {
  const [appState, setAppState] = useState({
    user: null,
    userData: null,
  });

  const [isOrderFormOpen, setOrderFormOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update appState.user with the user.
        setAppState((prevState) => ({ ...prevState, user }));
      } else {
        // User is signed out, update appState.user to null.
        setAppState((prevState) => ({ ...prevState, user: null }));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Toaster />
      <AppContext.Provider value={{...appState, setAppState}}>
        <Router>
          <div className="font-rubik bg-dark-blue flex flex-col justify-between text-orange-500">
            <div className="h-screen flex overflow-auto">
              <Sidebar />
              <div className="flex-grow">
                <Header style={{ height: '50px' }} />
                <Routes>
                  <Route path="/dashboard" Component={Dashboard} />
                  <Route path="/order-history" Component={OrderHistory} />
                  <Route path="/login" Component={Login} />
                  <Route path="/sign-in" Component={SignIn} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </AppContext.Provider>
    </div>
  );
};
export default App;
