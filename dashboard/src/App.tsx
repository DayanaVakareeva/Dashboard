import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header/Header';
import Login from './views/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation, } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar';
import Footer from './components/Footer/Footer';
import OrderHistory from './views/OrderHistory/OrderHistory';
import AppContext from './context/AppContext';
import Dashboard from './views/MainDashboard/MainDashboard';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn/SignIn';
import pieChart1 from './constants/pieChart1.jpg';
import Authenticated from './hoc/Authenticated';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * AppContent component
 *
 * This component renders the main content of the application.
 *
 * Returns:
 * - The main content of the application, which can include various components and views based on the application's routing and state.
 */
const AppContent = React.memo(function AppContent() {
  console.log('AppContent rendered');
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignInPage = location.pathname === '/sign-in';

  const backgroundImage = isLoginPage || isSignInPage ? `url(${pieChart1})` : 'none';

  return (
    <div
      className="font-rubik bg-dark-blue flex flex-col justify-between text-salmon h-screen"
      style={{ backgroundImage, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      <div className="flex-grow flex overflow-auto">
        <Sidebar />
        <div className="flex-grow">
          <Header style={{ height: '50px' }} />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Authenticated>
                  <Dashboard />
                </Authenticated>
              }
            />
            <Route
              path="/order-history"
              element={
                <Authenticated>
                  <OrderHistory />
                </Authenticated>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
});

/**
 * App component
 *
 * This is the root component of the application. It sets up the context provider and routing.
 *
 * State:
 * - appState: { user: User | null, userData: any | null } - The current user and their data.
 *
 * Context:
 * - AppContext: { user: User | null, userData: any | null } - Provides the current user and their data to the rest of the application.
 *
 * Returns:
 * - A context provider that provides the current user and their data to the rest of the application.
 * - A router that handles routing for the application.
 * - The `AppContent` component, which renders the rest of the application.
 */
function App() {
  console.log('App rendered');
  const [appState, setAppState] = useState({user: null, userData: null, loading: true});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAppState(prevState => ({ ...prevState, user, loading: false }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const memoizedSetAppState = useCallback((newState) => {
    setAppState(prevState => ({ ...prevState, ...newState }));
  }, []);

  if (appState.loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return (
    <div>
      <Toaster />
      <AppContext.Provider value={{ ...appState, setAppState: memoizedSetAppState }}>
        <Router>
          <AppContent />
        </Router>
      </AppContext.Provider>
    </div>
  );
}
export default App;
