import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";
import { FcGoogle } from 'react-icons/fc'

const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn()
    if (!isLoaded) return null;

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: '/auth-callback'
        })
    }

    return (
        <Button onClick={signInWithGoogle} variant={'secondary'} className="flex bg-customGreen2 h-11">
            <FcGoogle size={32} />
            <span className="text-lg font-semibold">Continue With Google</span>
        </Button>
    )
}

export default SignInOAuthButtons
