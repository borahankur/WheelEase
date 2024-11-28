import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { FaArrowLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"

const ChatbotPage = () => {
    return (
        <main className="bg-customGreen w-full min-h-screen relative">
            <div className="h-24 pl-4 gap-8 bg-customGreen2 flex items-center">
                <Link to='/options'>
                    <FaArrowLeft className='text-2xl' />
                </Link>
                <h1 className="ml-4 pl-10 text-center items text-3xl font-bold"><span className="border-b-4 border-black rounded-sm">CH</span>ATBOT</h1>
            </div>

            <div className="space-y-4 p-4">
                <div className="flex items-start gap-3">
                    <img src={'/chatbot.png'} alt="" className="size-20" />
                    <div className="rounded-xl p-3 max-w-[70%] bg-green-400">
                        <p className="text-sm font-semibold text-zinc-700">
                            Welcome to Wheelease!
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <img src={'/chatbot.png'} alt="" className="size-20" />
                    <div className="rounded-xl p-3 max-w-[70%] bg-green-400">
                        <p className="text-sm font-semibold text-zinc-700">
                            How may I assist you? 
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3 flex-row-reverse">
                    <img src={'/default.png'} alt="" className="size-14" />
                    <div className="rounded-xl p-3 max-w-[70%] bg-white">
                        <p className="text-sm font-semibold text-zinc-700">
                            Give me a guided tour of how to use the application
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-4 absolute bottom-10 w-full">
                <div className="flex gap-2">
                    <input
                        placeholder=" Type a message"
                        className="bg-white border-none rounded-full mt-1 w-full pl-4"
                    />
                    <Button size={"icon"} className="bg-white text-black hover:bg-gray-400">
                        <Send className="size-4" />
                    </Button>
                </div>
            </div>
        </main>
    )
}

export default ChatbotPage
