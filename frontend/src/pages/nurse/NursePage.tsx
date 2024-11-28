import { useState } from "react"
import { BiSolidUser } from "react-icons/bi"
import { FaArrowLeft } from "react-icons/fa6"
import { RiLockPasswordFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"

const NursePage = () => {
    const [userId,setUserId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    return (
        <main className='bg-customGreen w-screen h-screen'>
            <div className='flex h-14 items-center bg-customGreen2 justify-between relative'>
                <div className="pl-4">
                    <Link to='/options'>
                        <FaArrowLeft className="text-2xl" />
                    </Link>
                </div>
                <h3 className='absolute right-32 text-3xl font-bold text-gray-800 pr-8 pb-1'><span className='border-b-4 border-black rounded-sm'>NU</span>RSE</h3>
            </div>

            <div className='w-full h-4 bg-bar mt-1'></div>

            <div className='w-full h-80 mt-8'>
                {/* <form > */}

                    <div className='flex justify-evenly lg:justify-center'>
                        <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                            <BiSolidUser />

                        </label>
                        <input
                            type="text"
                            name="userId"
                            value={userId}
                            onChange={(e) => {
                                setUserId(e.target.value)
                            }}
                            required
                            className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3  focus:border-green-500'
                            placeholder='Enter User ID'

                        />

                    </div>

                    <div className='flex justify-evenly lg:justify-center mt-3'>
                        <label className='border-b-2 border-black lg:mr-8 flex items-center'>
                            <RiLockPasswordFill />
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required
                            className='bg-customGreen border-b-2 border-black py-1 lg:ml-8 px-3  focus:border-green-500'
                            placeholder='Enter Password'
                        />

                    </div>

                    <div className='w-full h-16 flex justify-center items-center lg:mt-10'>
                        <p className=''>Continue with User ID and Password</p>
                    </div>



                    <div className='flex justify-center items-center mt-10 h-16'>
                        <button
                            onClick={() => navigate('/nursePage')}
                            type='submit' 
                            className="bg-teal-500 text-white text-lg md:text-xl font-bold rounded-full hover:bg-teal-600 cursor-pointer py-3 px-8 md:py-5 md:px-10"
                        >
                            
                            Continue
                        </button>
                    </div>
                {/* </form> */}
            </div>
        </main>
    )
}

export default NursePage
