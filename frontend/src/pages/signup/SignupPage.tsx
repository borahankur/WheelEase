import { useEffect, useState } from 'react'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import SignInOAuthButtons from '@/components/SignInOAuthButtons'
import { IoMail } from 'react-icons/io5'
import { FaLock } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { FaUser } from 'react-icons/fa6'
import { useAuthStore } from '@/store/useAuthStore'
import { useSignUp } from '@clerk/clerk-react'
import { axiosInstance } from '@/lib/axios'


const nameSchema = z.string().min(2, { message: "Name must be at least 2 letters long" }).regex(/[a-zA-Z]+$/, { message: 'Name must only contain letters' })

const passwordSchema = z.string().min(8).refine((password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUppercase && hasNumber && hasSymbol
}, {
    message: "Password must contain at least one Uppercase letter, one number, and one symbol"
})

const emailSchema = z.string().email({ message: "Invalid email address" })

const SignupPage = () => {
    const { signUp } = useSignUp()
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nameValid, setNameValid] = useState(false)
    const [passwordValid, setPasswordValid] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/user')
        }
    }, [isAuthenticated, navigate])

    const validateNames = (name: String) => {
        try {
            nameSchema.parse(name)
            setError('')
            setNameValid(true)
        } catch (error: any) {
            setError(error.errors[0].message)
            setNameValid(false)
        }
    }

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
        const { name, value } = e.target; // Get the name and value from the input field
        // Check which field is being updated
        if (name === "firstName") {
            setFirstName(value);
            validateNames(value);
        }
        if (name === 'lastName') {
            setLastName(value);
            validateNames(value);
        }
        if (name === 'password') {
            setPassword(value); // Update the state
            validatePassword(value); // Validate phone number
        } else if (name === 'email') {
            setEmail(value); // Update the state
            validateEmail(value); // Validate email
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const result = await signUp?.create({
                emailAddress: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
            })
            if (result?.status === "complete") {
                const userId = result.createdUserId
                const response = await axiosInstance.post('/auth/createUser', {userId, firstName, lastName })
                if(response.data)
                {
                    console.log("User created successfully")
                    navigate('/user')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <main className='bg-customGreen w-screen h-screen'>
                <div className='flex h-24 justify-start items-center px-8 bg-customGreen lg:justify-center'>
                    <Link to='/login'>
                        <h3 className='text-xl font-medium text-gray-800 '>Log in</h3>
                    </Link>

                    <h1 className='text-3xl font-medium ml-6' >
                        <span className='border-b-[6px] border-black py-2 rounded-sm'>Sign</span> up
                    </h1>
                </div>

                <div className='w-full h-4 bg-bar'></div>

                <div className='w-full h-80 mt-12 '>
                    <form onSubmit={handleSignup}>
                        <div className='flex justify-evenly lg:justify-center mt-3'>
                            <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                                <FaUser />
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={handleInputChange} // Use the new handler
                                required
                                className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3 focus:outline-none focus:border-green-500'
                                placeholder='Enter First Name'
                            />
                            {nameValid && (
                                <div className="icon-container mt-2">
                                    <CiCircleCheck className='text-green-500' />
                                </div>
                            )}
                        </div>
                        <div className='flex justify-evenly lg:justify-center mt-3'>
                            <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                                <FaUser />
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={handleInputChange} // Use the new handler
                                className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3 focus:outline-none focus:border-green-500'
                                placeholder='Enter Last Name'
                            />
                            {nameValid && (
                                <div className="icon-container mt-2">
                                    <CiCircleCheck className='text-green-500' />
                                </div>
                            )}
                        </div>
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
                            <p className='text-center text-xl font-bold'>Sign up Using Email and Password</p>
                        </div>

                        {error && <p className="text-red-600 px-10 text-center">{error}</p>}

                        <div className='flex justify-center'>
                            <p className='font-bold'>Already have an account?</p>
                            <Link to='/login'>
                                <p className='ml-2 text-blue-400 font-bold hover:text-blue-700'>Login</p>
                            </Link>
                        </div>

                        <div className='flex justify-center items-center mt-10 h-16'>
                            {passwordValid && emailValid && (
                                <button type='submit' className="bg-teal-500 text-white text-lg md:text-xl font-bold rounded-full hover:bg-teal-600 cursor-pointer py-3 px-8 md:py-5 md:px-10">
                                    Signup
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
    )
}

export default SignupPage
