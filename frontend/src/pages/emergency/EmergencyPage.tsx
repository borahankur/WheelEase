import { Link } from "react-router-dom"
import { FaArrowLeft } from 'react-icons/fa6'

const EmergencyPage = () => {
    return (
        <main className="bg-customGreen w-screen min-h-screen flex flex-col justify-between overflow-y-hidden">
            <div className="bg-customGreen2 flex items-center justify-between h-14 pt-2">
                {/* Left Arrow */}
                <div className="pl-4">
                    <Link to='/options'>
                        <FaArrowLeft className="text-2xl" />
                    </Link>
                </div>

                {/* Title in the Center */}
                <h1 className="text-2xl pl-5 text-center font-bold">
                    <span className="border-b-4 border-black rounded-sm">EM</span>ERGENCY
                </h1>

                {/* Chatbot Icon on the Right */}
                <div className="pt-5">
                    <img src={'/chatbot.png'} alt="chatbot" className="size-16 cursor-pointer" />
                </div>
            </div>

            <div className='w-full h-4 bg-bar'></div>


            <div className="flex-1 pt-16 overflow-hidden">
                <div className='flex justify-center p-6 items-center'>
                    <Link to='/ambulance'>
                        <img src={'/Ambulance.png'} alt="ambulance" className="size-36" />
                    </Link>
                </div>
                <div className='flex justify-around p-6 items-center'>
                    <img src={'/wheelchair2.png'} alt="wheelchair" className="size-36" />
                    <img src={'/Stretcher.png'} alt="stretcher" className="size-36" />
                </div>

                <div className='px-5 mt-10'>
                    <p className='text-center'>“The <span className='text-blue-800 font-bold underline'>108</span> service is a government initiative that aims </p>
                    <p className='text-center'>   to make healthcare accessible to everyone,</p>
                    <p className='text-center'> regardless of location”</p>
                </div>
            </div>



            <div>
                <p className='absolute bottom-2 px-5 text-center text-red-600'>Note: The emergency wheelchair services are only available inside the hospital</p>
                <div className='mt-16 lg:m-0 flex justify-center'>
                    <img src={'/houses.png'} alt="Vector2" />
                </div>
            </div>


        </main>
    )
}

export default EmergencyPage
