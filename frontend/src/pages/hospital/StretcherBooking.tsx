import { axiosInstance } from "@/lib/axios"
import { useHospitalStore } from "@/store/useHospitalStore"
import { useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"

const StretcherBooking = () => {

    const navigate = useNavigate()
    const { currentfloor, currentHospital, createBooking } = useHospitalStore()
    const { user } = useUser()
    const userId = user?.id
    const [isPm, setIsPm] = useState(false)
    const [selectedDay, setSelectedDay] = useState('MON')
    const [selectedTime, setSelectedTime] = useState(1)
    const daysOfWeek = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];
    const getFloorEquipment = (floorNumber: string) => {
        if (currentHospital && currentHospital.floorEquipment) {
            const floor = currentHospital.floorEquipment.find((item) => item.floorNumber === floorNumber)
            return floor || null;
        }
        return null;
    }


    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                await axiosInstance.post(`hospital/${currentHospital?._id}/stretcher/updateStatus`, { equipment: "stretcher" })
            } catch (error) {
                console.log("Error: ", error)
            }
        }, 30 * 1000);

        return () => clearInterval(intervalId)
    }, [])

    const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const success = await createBooking(userId, isPm, selectedDay, selectedTime, "stretcher")
            if (success) {
                navigate(`/hospital/${currentHospital?._id}/stretcher/booking/confirm`)
            }
        } catch (error) {
            console.log("Error in creating a booking", error)
        }
    }

    return (
        <main className="bg-customGreen flex flex-col w-screen min-h-screen overflow-y-hidden">
            <div className="flex items-center justify-between bg-customGreen2 h-14 pt-2">
                <div className="pl-4">
                    <FaArrowLeft onClick={() => window.history.back()} className="text-2xl" />
                </div>
                <h1 className="text-2xl pl-5 font-bold text-center">
                    <span className="border-b-4 border-black rounded-sm">WH</span>EELCHAIR
                </h1>
                <div className="pt-5">
                    <Link to={'/chatbot'}>
                        <img src={'/chatbot.png'} alt="chatbot" className="size-16 cursor-pointer" />
                    </Link>
                </div>
            </div>
            <div className="w-full h-4 bg-bar" />

            <h1 className="text-2xl px-4 font-bold pt-3">Your floor</h1>
            <div className="flex space-x-4 pl-8 mt-6">
                <button
                    className="rounded-full font-bold bg-green-300 text-white text-xl shadow-md size-12 focus:outline-none transition duration-200"
                >
                    {currentfloor}
                </button>
            </div>
            <h1 className='text-2xl px-4 py-2 gap-4 font-bold mt-6'>Available</h1>
            <div className="flex justify-center items-center">
                <img src={`/Stretcher.png`} alt="stretcher booking" className="size-44 px-3 py-3" />
                <div className="px-2 py-4 border border-black bg-customGreen2 rounded-full">
                    Total Stretchers Available: <span className="font-bold">{getFloorEquipment(currentfloor)?.stretchers}</span>
                </div>
            </div>
            <form onSubmit={handleBooking} className="flex flex-col items-center">
                <div className="flex items-center gap-4 px-4 py-2 mt-6">
                    <h1 className='text-2xl font-bold'>Advance Booking</h1>
                    <div className="mt-2">
                        <button type="button"
                            className={`shadow-md rounded-2xl px-3 py-1 bg-green-300 hover:text-white hover:border border-black transition duration-500
                                ${isPm ? 'border-black text-white bg-green-400' : 'text-black border-gray-800'}
                            `}
                            onClick={() => { setIsPm(!isPm) }}
                        >
                            {isPm ? 'PM' : 'AM'}
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 pl-2 justify-evenly">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                        >
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={`
                                px-2 py-1 rounded-2xl shadow-lg 
                                hover:text-white hover:border border-black transition duration-500 
                                 ${selectedDay === day ? 'font-semibold border border-black text-white bg-green-400' : 'bg-green-300 text-black'}
                                 `}
                            >
                                {day}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="pt-8 mx-auto w-[90%]">
                    <div className="grid grid-rows-2 grid-cols-6 gap-3">
                        {Array.from({ length: 12 }, (_, idx) => (
                            <button
                                type="button"
                                onClick={() => setSelectedTime(idx + 1)}
                                className={`px-2 py-2 rounded-2xl shadow-lg
                            hover:text-white hover:border border-black transition duration-500
                            ${selectedTime === idx + 1 ? 'font-semibold border border-black text-white bg-green-400' : 'bg-green-300 text-black'} 
                            `}
                                key={idx + 1}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pt-8">
                    <button
                        className="px-4 py-4 bg-green-300 rounded-full shadow-md hover:font-semibold hover:border border-black hover:scale-105 transition-transform"
                        type="submit"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </main>
    )
}

export default StretcherBooking
