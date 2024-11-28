import { Link } from 'react-router-dom'; 

const HomePage = () => {
    return (
        <>
            <main className='w-screen h-screen bg-customGreen flex flex-col items-center py-32 md:py-20'>
                <div className='text-center'>
                    <h1 className='text-2xl md:text-4xl mb-2'>Welcome to</h1>
                    <h1 className='text-3xl md:text-5xl font-bold'>WheelEase</h1>
                </div>

                <div className='mt-8 md:mt-12 flex justify-center max-w-xs'>
                    <img src={'/splashscreenlogo.png'} alt="wheelchair" className='sm:w-full md:h-72 lg:w-72' />
                </div>

                <div className='flex justify-center mt-16 md:mt-24 max-w-sm'>
                    <Link to="/options">
                    <button className="bg-teal-500 text-white text-lg md:text-xl font-bold rounded-full hover:ring-2 hover:ring-offset-1 hover:bg-teal-600 cursor-pointer transition-colors duration-200 py-3 px-8 md:py-5 md:px-10">
                        Get Started
                    </button>
                    </Link>
                </div>
            </main>
        </>
    );
}

export default HomePage;
