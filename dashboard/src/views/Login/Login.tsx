import { useContext, useEffect, useState, FormEvent } from 'react';
import { loginUser } from '../../services/auth.service.ts';
import AppContext from '../../context/AppContext.tsx';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

/**
 * Interface for user credentials
 */
interface UserCredentials {
  user: string;
  userData: any;
}

/**
 * Login component
 * @returns JSX.Element
 */
export default function Login() {
  const { user, setAppState } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Effect hook to navigate if user exists
   */
  useEffect(() => {
    if (user) {
      navigate(location.state?.from.pathname || '/');
    }
  }, [user]);

  /**
   * Effect hook to add body class
   */
  useEffect(() => {
    document.body.classList.add('body-with-background');

    return () => {
      document.body.classList.remove('body-with-background');
    };
  }, []);

  /**
   * Function to update form state
   * @param {string} prop - The property to update
   * @returns {Function} - A function that takes an event and updates the form state
   */
  const updateForm = (prop: string) => (e: FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [prop]: e.currentTarget.value });
  };

  /**
   * Function to login the user
   * @param {any} data - The user data
   */
  const login = async (data: any) => {
    if (!data || !data.email || !data.password) {
      toast.error('Email or password cannot be empty.');
      return;
    }

    try {
      const userCredentials: UserCredentials = await loginUser(
        data.email,
        data.password
      );
      setAppState({ user: userCredentials.user, userData: null });
      navigate('/dashboard');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          toast.error('Username or password do not match.');
          break;
        default:
          console.log(error);
          toast.error('Something went wrong! Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-12 lg:px-8 max-w-xl mx-auto">
      <div className="mt-10 sm:w-full sm:max-w-">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(form);
          }}
        >
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-text-yellow"
            >
              Your e-mail:{' '}
            </label>
            <input
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={updateForm('email')}
            />
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-text-yellow"
            >
              Password:{' '}
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={form.password}
                onChange={updateForm('password')}
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <button
              type="submit"
              onClick={() => login(form)}
              className="flex w-full justify-center rounded-md bg-button-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>
          <br />
          <div className="mt-10 text-center text-sm text-dark-red">
            Don't have an account?
            <Link to="/sign-in">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
