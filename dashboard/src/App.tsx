import { useState } from 'react'
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './config/firebase-confog'
import Header from './components/Header/Header'
import Login from './views/Login/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar/Sidebar'

function App() {
  const [ appState, setAppState] = useState({
    user: null,
    userData: null
  })

  // const [user, loading, error] = useAuthState(auth)

  return (
    <Router>
      <div className="bg-dark-blue h-screen flex">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header style = {{ height: '50px' }} />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default App

