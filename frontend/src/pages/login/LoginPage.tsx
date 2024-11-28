import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa6'
import SignInOAuthButtons from '@/components/SignInOAuthButtons';
import { IoMail } from 'react-icons/io5';
import { CiCircleCheck } from 'react-icons/ci';
import { useAuthStore } from '@/store/useAuthStore';

const passwordSchema = z.string().min(8).refine((password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUppercase && hasNumber && hasSymbol
}, {
    message: "Password must contain at least one Uppercase letter, one number, and one symbol"
})


const emailSchema = z.string().email({ message: "Invalid email address" })

const LoginPage = () => {
    const { isAuthenticated, login } = useAuthStore()
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordValid, setPasswordValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    // Function to validate the phone number
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user')
        }
    }, [isAuthenticated, navigate])

    const validatePassword = (password: String) => {
        try {
            passwordSchema.parse(password)
            setError('')
            setPasswordValid(true)
        }
        catch (err: any) {
            setError(err.errors[0].message)
            setPasswordValid(false)
        }
    }

    const validateEmail = (mail: String) => {
        try {
            emailSchema.parse(mail)
            setError('')
            setEmailValid(true)
        }
        catch (err: any) {
            setError(err.errors[0].message)
            setEmailValid(false)
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
            validatePassword(value);
        } else if (name === 'email') {
            setEmail(value);
            validateEmail(value);
        }
    };

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(email,password)
    };

    return (
        <>
            <main className='bg-customGreen w-screen h-screen'>
                <div className='flex h-24 justify-start items-center px-8 bg-customGreen lg:justify-center'>
                    <h1 className='text-3xl font-medium'>
                        <span className='border-b-[6px] border-black py-2 rounded-sm'>Log</span> in
                    </h1>
                    <Link to='/signup'>
                        <h3 className='text-xl font-medium text-gray-800 ml-6'>Sign up</h3>
                    </Link>
                </div>

                <div className='w-full h-4 bg-bar'></div>

                <div className='w-full h-80 mt-8'>
                    <form onSubmit={handleLogin}>
                        <div className='flex justify-evenly lg:justify-center mt-3'>
                            <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                                <IoMail />
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange} // Use the new handler
                                required
                                className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3 focus:outline-none focus:border-green-500'
                                placeholder='Enter Email'

                            />
                            {emailValid && (
                                <div className="icon-container mt-2">
                                    <CiCircleCheck className='text-green-500' />
                                </div>
                            )}
                        </div>

                        <div className='flex justify-evenly lg:justify-center mt-3'>
                            <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                                <FaLock />
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange} // Use the new handler
                                required
                                className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3 focus:outline-none focus:border-green-500'
                                placeholder='Enter Password'
                            />
                            {passwordValid && (
                                <div className="icon-container mt-2">
                                    <CiCircleCheck size={16} className='text-green-500' />
                                </div>
                            )}
                        </div>

                        <div className='w-full h-16 flex justify-center items-center lg:mt-10'>
                            <p className='text-center text-xl font-bold'>Login with your phone number</p>
                        </div>

                        {error && <p className="text-red-600 px-10 text-center">{error}</p>}

                        <div className='flex justify-center'>
                            <p className='font-bold'>Don't have an account?</p>
                            <Link to='/signup'>
                                <p className='ml-2 text-blue-700 font-bold'>Signup</p>
                            </Link>
                        </div>

                        <div className='flex justify-center items-center mt-10 h-16'>
                            {passwordValid && emailValid && (
                                <button type='submit' className="bg-teal-500 text-white text-lg md:text-xl font-bold rounded-full hover:bg-teal-600 cursor-pointer py-3 px-8 md:py-5 md:px-10">
                                    Log in
                                </button>
                            )}
                        </div>
                    </form>

                </div>
                <div className='mt-40'>
                    <p className='text-center font-bold'>Or Connect</p>
                </div>
                <div className='flex justify-center items-center mt-2'>
                    <SignInOAuthButtons />
                </div>
            </main>
        </>
    );
};

export default LoginPage
