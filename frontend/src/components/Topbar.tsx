import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "./SignInOAuthButtons";

const Topbar = () => {
    return (
        <div className="flex items-center justify-between p-4 sticky bg-zinc-900/75
        backdrop-blur-md z-10 rounded-md
    ">
            <div className="flex gap-2 items-center ">
                <p className="font-bold text-lg">Vibeify</p>
            </div>
            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInOAuthButtons />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}

export default Topbar
