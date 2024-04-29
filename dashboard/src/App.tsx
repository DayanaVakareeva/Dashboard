import { useState } from 'react'
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase-config'
import Header from './components/Header/Header'
import Login from './views/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar'
import Order from './components/Order/Order'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react'
import Footer from './components/Footer/Footer'

function App() {
  const [ appState, setAppState] = useState({
    user: null,
    userData: null
  })

  const [isOrderFormOpen, setOrderFormOpen] = useState(false);

  // const [user, loading, error] = useAuthState(auth)
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update appState.user with the user.
        setAppState({ ...appState, user });
      } else {
        // User is signed out, update appState.user to null.
        setAppState({ ...appState, user: null });
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {appState.user ? (
        <div className="font-rubik bg-dark-blue flex flex-col justify-between">
          <div className="h-screen flex overflow-auto">
            <Sidebar />
            <div className="flex flex-col flex-grow">
              <Header style = {{ height: '50px' }} />
              <button onClick={() => setOrderFormOpen(true)}>Open Order Form</button>
              {isOrderFormOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-4 rounded">
                    <Order userId={appState.user?.uid} />
                    <button onClick={() => setOrderFormOpen(false)}>Close</button>
                  </div>
                </div>
              )}
              <div className="flex-grow">
                <Routes>
                  {/* Add more routes as needed */}
                </Routes>
              </div>
            </div>
          </div>
          <Footer/>
        </div>
      ) : (
        <Login/>
      )}
    </Router>
  );}
export default App

