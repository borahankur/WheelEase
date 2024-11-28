import { useUser } from "@clerk/clerk-react"
import { Link } from "react-router-dom"

const SelectorPage = () => {
    const { user } = useUser()
    return (
        <main className='bg-customGreen w-screen min-h-screen flex flex-col justify-between md:justify-evenly'>
            <div className='w-full mt-12 text-center py-5'>
                <h1 className='text-3xl font-bold'>Select your option</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-w-5xl mx-auto overflow-hidden">
                <Link to={'/emergency'} className="flex justify-center">
                    <img src={'/Emergency.png'} alt='Emergency' className="size-32 md:size-40" />
                </Link>
                {!user &&
                    <Link to={'/signup'} className="flex justify-center">
                        <img src={'/User.png'} alt='User' className="size-32 md:size-40" />
                    </Link>
                } 
                {user &&  
                    <Link to={'/user'} className="flex justify-center">
                        <img src={'/User.png'} alt='User' className="size-32 md:size-40" />
                    </Link>
                }
                <Link to={'/employee'} className="flex justify-center">
                    <img src={'/Employee.png'} alt='Employee' className="size-32 md:size-40" />
                </Link>
                <Link to={'/nurse'} className="flex justify-center">
                    <img src={'/Nurse.png'} alt='Nurse' className="size-32 md:size-40" />
                </Link>
                <Link to={'/chatbot'} className="flex justify-center">
                    <img src={'/Helpbutton.png'} alt='Helpbutton' className="size-32 md:size-40" />
                </Link>
                <Link to={'/doctor'} className="flex justify-center">
                    <img src={'/Doctor.png'} alt='Doctor' className="size-32 md:size-40" />
                </Link>
            </div>

            <div className='w-full max-w-md md:hidden'>
                <img src={'/houses.png'} alt="Vector2" className="w-full h-auto" />
            </div>
        </main>
    )
}

export default SelectorPage
