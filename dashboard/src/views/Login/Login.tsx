import { useContext, useEffect, useState, FormEvent } from "react";
import { loginUser } from "../../services/auth.service";
import { AppContext } from "../../context/AppContext.tsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import SignIn from "../../components/SignIn/SignIn.tsx";


interface UserCredentials {
    user: string;
    userData: any;
  }
  
  export default function Login() {
    const { user, setAppState } = useContext(AppContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignInFormOpen, setSignInFormOpen] = useState(false)
  
    const [form, setForm] = useState({
      email: '',
      password: '',
    });
  
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (user) {
        navigate(location.state?.from.pathname || '/')
      }
    }, [user]);

    useEffect(() => {
      // add the class to the body when the component is mounted
      document.body.classList.add('body-with-background');
  
      // remove the class from the body when the component is unmounted
      return () => {
        document.body.classList.remove('body-with-background');
      };
    }, []);
  
    const updateForm = (prop: string) => (e: FormEvent<HTMLInputElement>) => {
      setForm({ ...form, [prop]: e.currentTarget.value });
    }
  
    const login = async () => {
      if (form.email.length === 0) {
        toast.error('Email cannot be empty');
      } else if (form.password.length < 6) {
        toast.error('Password must be at least 6 characters');
      } else {
        try {
          const userCredentials: UserCredentials = await loginUser(form.email, form.password);
          setAppState({ user: userCredentials.user, userData: null });
        } catch (error: any) {
          if (error.message.includes('auth/')) {
            toast.error('Username or password do not match.');
          } else {
            toast.error('Something went wrong! Please try again.');
          }
        }
      }
    }

    return (
      <div className="flex min-h-screen justify-center items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-w-xl mx-auto">
            <div className="mt-10 sm:w-full sm:max-w-">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">User Login</h1>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Your e-mail: </label>
                        <input autoComplete="off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          type="email" name="email" id="email" value={form.email}
                            onChange={updateForm('email')} />
                    </div>
                    
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password: </label>
                        <input autoComplete="off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type={showPassword ? 'text' : 'password'} name="password" id="password"
                            value={form.password}
                            onChange={updateForm('password')}
                        />
                    </div>            
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">                    
                    <button type="submit" onClick={login} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                     Login</button>
                    </div>
                    <br />
                    <div className="mt-10 text-center text-sm text-gray-500">Don`t have an account? <button onClick={() => setSignInFormOpen(true)}>Sign In
                    </button>
                    {isSignInFormOpen && (
                    <SignIn onClose={() => setSignInFormOpen(false)} />
                    )}</div>
                </form>
            </div >
        </div>
      </div>
    )
}