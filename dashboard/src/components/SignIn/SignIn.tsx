import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { registerUser } from '../../services/auth.service.ts';
import { createUser } from '../../services/user.service';
import AppContext from '../../context/AppContext.tsx';

interface FormState {
  username: string;
  email: string;
  password: string;
}

/**
 * SignIn is a component that provides a form for user registration.
 * It includes fields for username, email, and password.
 * The form validates the input and uses the registerUser and createUser services to register the user.
 * If the registration is successful, the user is redirected to the login page.
 *
 * @component
 * @example
 * return (
 *   <SignIn />
 * )
 */
const SignIn: React.FC = () => {
  console.log('SignIn component rendered');
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const updateForm = (prop) => (e) => {
    console.log('createUserAcc function called'); 
    setForm({ ...form, [prop]: e.target.value });
  };

  const navigate = useNavigate();
  const { setAppState } = useContext(AppContext);
  
  /**
 * createUserAcc is a function that handles the form submission.
 * It validates the form input and uses the registerUser and createUser services to register the user.
 * If the registration is successful, the user is redirected to the login page.
 * If an error occurs during registration, it is logged to the console.
 *
 * @async
 * @function
 * @param {React.FormEvent} e - The form event.
 * @throws Will throw an error if the registration fails.
 */
  const createUserAcc = async (e) => {
    e.preventDefault();
    const { username, email, password } = form;

    if (username.length === 0) {
      toast.error('Username cannot be empty');
      return;
    } else if (email.length === 0) {
      toast.error('Email cannot be empty');
      return;
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    } else {
      try {
        console.log('Before registerUser');
        const userCredentials = await registerUser(email, password);
        console.log('After registerUser', userCredentials);

        const user = await createUser(
          username,
          email,
          userCredentials.user.uid
        );
        console.log('After createUser', user);
        console.log('Before setAppState');
        setAppState({ user, userData: null });
        console.log('After setAppState');

        toast.success('User account created successfully');
        navigate('/login');
      } catch (error) {
        console.error('An error occurred while creating the user account');
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-12 lg:px-8 max-w-xl mx-auto">
      <div className="mt-10 sm:w-full sm:max-w-">
        <form
          className="flex flex-col justify-center items-center h-full"
          onSubmit={createUserAcc}
        >
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-text-yellow"
            >
              Username:{' '}
            </label>
            <input
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={updateForm('username')}
            />
          </div>

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
            <input
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={form.password}
              onChange={updateForm('password')}
            />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-button-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
