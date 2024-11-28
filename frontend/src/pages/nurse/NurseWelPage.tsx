// import { Link } from "react-router-dom"

const NurseWelPage = () => {
    return (
        <main className="bg-customGreen flex flex-col w-full min-h-screen overflow-hidden relative">
            <div className="h-24 pt-2 bg-customGreen2 items-center">
                <h1 className="pt-4 text-center text-3xl font-bold"><span className="border-b-4 border-black rounded-sm">NU</span>RSE</h1>
            </div>
            <div className="pt-3">
                <div className="bg-bar mt-1 h-4 rounded-xl" />
                <div className="flex gap-2">
                    <img src={'/default.png'} alt="" className="px-4" />
                    <div>
                        <h1 className="font-semibold text-lg pt-4">Hello Mr/Mrs /nursename/</h1>
                        <h2 className="text-sm">Welcome to Hospital 1</h2>
                    </div>
                </div>
            </div>
            <div className='h-16 flex items-center px-4'>
                <h1 className='text-2xl pt-8 font-bold'>Booking</h1>
            </div>
            <div className='pt-4 flex-1 overflow-hidden'>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='flex justify-evenly gap-6 py-3 lg:justify-center' >
                        {/* <Link to={`/hospital/${currentHospital?._id}/wheelchair`}> */}
                            <img src={'/Wheelchair(self service).png'} alt="" className='w-36 h-36 lg:mx-5' />
                        {/* </Link> */}

                        {/* <Link to={`/hospital/${currentHospital?._id}/stretcher`}> */}
                            <img src={'/Stretcher.png'} alt="" className='w-36 h-36' />
                        {/* </Link> */}
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0">
                <img src={'/houses.png'} alt="" className="" />
            </div>
        </main>
    )
}

export default NurseWelPage
