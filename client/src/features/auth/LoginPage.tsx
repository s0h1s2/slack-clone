import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {SignInFlow} from "@/features/auth/types.ts";

const LoginPage = () => {
    const [screenState,setScreenState] = useState<SignInFlow>("login");
    
  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
        <div className="md:h-auto md:w-[420px]">
            Auth Screen
        </div>
    </div>
  )
}

export default LoginPage
