import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa6'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useHospitalStore } from '@/store/useHospitalStore'
import { useEffect } from 'react'

function UserPage() {

    const { user } = useUser()
    const { hospitals, getAllHospitals } = useHospitalStore()
    useEffect(() => {
        getAllHospitals()
    }, [getAllHospitals])
    return (
        <>
            <main className="bg-customGreen w-screen min-h-screen overflow-y-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between bg-customGreen2 h-14 pt-2">
                    {/* Left Arrow */}
                    <div className="pl-4">
                        <Link to='/options'>
                            <FaArrowLeft className='text-2xl' />
                        </Link>

                    </div>

                    {/* Title in the Center */}
                    <h1 className="text-2xl pl-5 font-bold text-center">
                        <span className="border-b-4 border-black rounded-sm">US</span>ER
                    </h1>

                    {/* Chatbot Icon on the Right */}
                    <div className="pt-5">
                        <img src={'/chatbot.png'} alt="chatbot" className="size-16 cursor-pointer" />
                    </div>
                </div>

                <div className='w-full h-4 bg-bar'></div>

                <div className='flex gap-4 py-5 h-22 items-center px-4'>
                    <UserButton
                        appearance={
                            {
                                elements: {
                                    formButtonPrimary: 'bg-slate-500 hover:bg-slate-400 text-sm',
                                }
                            }
                        }
                    />
                    <h1 className='text-2xl'>{`Hello, ${user?.firstName}`}</h1>
                </div>

                <div className='pt-8 flex-1 overflow-hidden'>
                    <div className='flex flex-col items-center space-y-4'>
                        <h1 className='text-xl font-bold text-center'>Select your hospital</h1>
                        <div className='pt-8 grid grid-cols-2 gap-8 md:grid-cols-3 max-w-5xl mx-auto'>
                            {
                                hospitals.map((hospital) => (
                                    <Link
                                        to={`/hospital/${hospital._id}`}
                                        key={hospital._id}
                                    >
                                        <img src={hospital.imageUrl} alt="Hospital Image" className='size-32 lg:mx-5' />
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className='w-full max-w-md'>
                    <img src={'/houses.png'} alt="Vector2" className='w-full h-auto' />
                </div>


            </main>
        </>
    )
}

export default UserPage
