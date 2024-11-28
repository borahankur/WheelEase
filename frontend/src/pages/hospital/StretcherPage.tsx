import { useHospitalStore } from '@/store/useHospitalStore';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function StretcherPage() {

    const [selectedFloor, setSelectedFloor] = useState('B')
    const { currentHospital, isLoading, setCurrentFloor } = useHospitalStore()

    if (isLoading) {
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-emerald-500 animate-spin" />
        </div>
    }

    useEffect(() => {
        setCurrentFloor(selectedFloor)
    }, [selectedFloor])

    const totalFloors = currentHospital ? currentHospital.floors : 5
    const floors = ["B", "G"]
    for (let i = 1; i <= totalFloors - 2; i++) {
        floors.push(i.toString())
    }

    const getMapIndex = (floor: string) => {
        switch (floor) {
            case 'B': return 0;
            case 'G': return 1;
            default: return parseInt(floor) + 1
        }
    }

    return (
        <>
            <main className="bg-customGreen flex flex-col w-screen min-h-screen overflow-y-hidden">
                <div className="flex items-center justify-between bg-customGreen2 h-14 pt-2">
                    <div className="pl-4">
                        <FaArrowLeft onClick={() => window.history.back()} className='text-2xl' />
                    </div>
                    <h1 className="text-2xl pl-5 font-bold text-center">
                        <span className="border-b-4 border-black rounded-sm">ST</span>RETCHER
                    </h1>
                    <div className="pt-5">
                        <img src={'/chatbot.png'} alt="chatbot" className="size-16 cursor-pointer" />
                    </div>
                </div>
                <div className='w-full h-4 bg-bar'></div>

                {/* Select Floor Section */}
                <h1 className='text-2xl px-4 font-bold pt-3'>Select your floor</h1>

                <div className="flex space-x-4 pl-8 mt-6">
                    {floors.map((floor, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedFloor(floor)}
                            className={`w-12 h-12 rounded-full text-xl font-bold shadow-md 
                            ${selectedFloor === floor ? "bg-green-300 text-white" : "bg-green-400/80 text-black"} 
                            focus:outline-none transition duration-200`}
                        >
                            {floor}
                        </button>
                    ))}
                </div>

                <h1 className='text-2xl px-4 py-2 gap-4 font-bold mt-6'>Available</h1>
                <Link to={`/hospital/${currentHospital?._id}/stretcher/booking`}>
                    <img src={'/Stretcher.png'} alt="stretcher" className='size-44 px-3 py-3' />
                </Link>

                {/* Guiding Map */}
                <h1 className='text-2xl px-4 font-bold mt-6'>Guiding Map</h1>
                {selectedFloor && (
                    <div className="mt-4 text-center">
                        <img
                            src={currentHospital?.guidingMaps[getMapIndex(selectedFloor)]}
                            className='mx-auto rounded-lg shadow-md border border-black w-4/5 hover:cursor-pointer'
                        />
                    </div>
                )}
            </main>
        </>
    );
}

export default StretcherPage;
