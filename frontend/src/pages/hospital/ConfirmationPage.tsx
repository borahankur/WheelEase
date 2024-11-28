import { useHospitalStore } from "@/store/useHospitalStore"
import { useNavigate } from "react-router-dom"

const ConfirmationPage = () => {
    const navigate = useNavigate()
    const {currentHospital} = useHospitalStore()
    return (
        <main className="relative w-full min-h-screen bg-customGreen overflow-y-hidden">
            <div className="items-center bg-customGreen2 h-16 pt-2">
                <h1 className="text-3xl pl-5 font-bold text-center">
                    <span className="border-b-4 border-black ">Co</span>nfirmation
                </h1>
                <div className="w-full h-4 bg-bar" />
                <div className="flex flex-col items-center justify-center pt-8">
                    <img src={'/confirmation.png'} alt="" className="pt-8 transition-transform scale-90 hover:scale-105" />
                    <div className="flex items-center pt-12">
                        <button
                            onClick={() => {navigate(`/hospital/${currentHospital?._id}`)}}
                            className="px-12 py-6 bg-green-300 text-xl rounded-full shadow-md hover:text-white hover:font-semibold hover:border border-black transition-colors duration-300">
                            Done
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0">
                <img src={'/houses.png'} alt="" />
            </div>
        </main>
    )
}

export default ConfirmationPage
