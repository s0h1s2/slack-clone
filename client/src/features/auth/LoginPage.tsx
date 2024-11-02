import { useState } from "react";
import { SignInFlow } from "@/features/auth/types.ts";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

const LoginPage = () => {
  const [screenState, setScreenState] = useState<SignInFlow>("login");

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="md:h-auto md:w-[420px]">
        {screenState==="login"?<SignInCard setScreenState={setScreenState}/>:<SignUpCard setScreenState={setScreenState}/>}
      </div>
    </div>
  );
};

export default LoginPage;
