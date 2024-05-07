import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logoutUser } from '../../services/auth.service';
import { toast } from 'react-hot-toast';
/**
 * Sidebar component that displays navigation links.
 *
 * The Sidebar component uses Firebase authentication to check if a user is logged in.
 * If a user is logged in, it displays links to the Dashboard and Order History pages,
 * as well as a Logout link. If a user is not logged in, it displays a Login link.
 *
 * @component
 * @example
 * return (
 *   <Sidebar />
 * )
 */
export default function Sidebar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    toast((t) => (
      <div>
        Are you sure you want to log out?
        <button style={{ marginRight: '10px', marginLeft: '10px', color: 'green' }} onClick={handleLogoutConfirmed}>Yes</button>
        <button style={{ color: 'red'}} onClick={() => toast.dismiss(t.id)}>No</button>
      </div>
    ));
  };
  
  const handleLogoutConfirmed = async () => {
    try {
      await logoutUser();
      navigate('/login'); 
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <>
      <div
        className="w-[8%] h-[60vh] text-text-yellow text-3xl"
        style={{
          textShadow:
            '0 0 10px #DECE9A, 0 0 10px #DECE9A, 0 0 10px #FF4500, 0 0 10px #FF4500',
        }}
      >
        <div>
          <ul className="p-4">
            {user ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <br />
                <li>
                  <Link to="/order-history">Order History</Link>
                </li>
                <br />
                <li>
                <button style={{ color: '#FF6384', 
                textShadow:
                '0 0 2px #FF6384, 0 0 2px #FF6384, 0 0 5px #DECE9A, 0 0 5px #DECE9A', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', outline: 'inherit' }} onClick={handleLogout}>
                Logout
                </button>
                </li>
              </>
            ) : (
              <li className="category-item">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
