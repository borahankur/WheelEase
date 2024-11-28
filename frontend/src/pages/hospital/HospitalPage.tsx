import { useHospitalStore } from "@/store/useHospitalStore"
import { UserButton, useUser } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa6"
import { Link, useParams } from "react-router-dom"

const HospitalPage = () => {
  const { user } = useUser()
  const { hospitalId } = useParams()
  const { getHospitalDetails, currentHospital } = useHospitalStore()
  const [currentAd, setCurrentAd] = useState(0)
  const adverts = [
    '/ad1.png',
    '/ad2.png',
    '/ad3.png',
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prevAd) => (prevAd + 1) % adverts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hospitalId) {
      getHospitalDetails(hospitalId)
    }
  }, [hospitalId, getHospitalDetails])

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
            <Link to={'/chatbot'}>
              <img src={'/chatbot.png'} alt="chatbot" className="size-16 cursor-pointer" />
            </Link>
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
          <div>
            <h1 className='text-2xl font-bold'>{`Hello, ${user?.firstName}`}</h1>
            <h4 className="font-semibold">Welcome to {currentHospital?.fullname}</h4>
          </div>
        </div>

        <div className="h-16 flex items-center px-4">
          <h1 className="text-2xl font-bold">Advertisement</h1>
        </div>
        {/* Carousel for */}
        <div className="relative w-full overflow-hidden py-2">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentAd * 100}%)` }}>
            {adverts.map((advert, index) => (
              <div key={index} className="w-full flex-shrink-0 py-3 px-4">
                <img
                  src={advert}
                  alt={`Advert ${index + 1}`}
                  className="object-cover rounded-2xl w-full"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {adverts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAd(index)}
                className={`size-3 rounded-full ${index === currentAd ? 'bg-emerald-300' : 'bg-gray-300'}`}
              >
              </button>
            ))}
          </div>
        </div>
        <div className='h-16 flex items-center px-4'>
          <h1 className='text-2xl pt-8 font-bold'>Booking</h1>
        </div>
        <div className='pt-4 flex-1 overflow-hidden'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='flex justify-evenly gap-6 py-3 lg:justify-center' >
              <Link to={`/hospital/${currentHospital?._id}/wheelchair`}>
                <img src={'/Wheelchair(self service).png'} alt="" className='w-36 h-36 lg:mx-5' />
              </Link>

              <Link to={`/hospital/${currentHospital?._id}/stretcher`}>
                <img src={'/Stretcher.png'} alt="" className='w-36 h-36' />
              </Link>
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

export default HospitalPage
