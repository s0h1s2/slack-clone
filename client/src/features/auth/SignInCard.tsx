import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SetScreenState } from "./types"

type Props={
    setScreenState:SetScreenState
}
const SignInCard = ({setScreenState}:Props) => {

  return (
    <Card className="w-full h-full p-8">
        <CardHeader className="px-0 pt-0">
            <CardTitle>
Login to continue
            </CardTitle>
        <CardDescription>
            Use your email to continue
        </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
            <form className="space-y-2.5">
                <Input placeholder="Email" type="email" required />
                <Input placeholder="Password" type="password" required />
                <Button type="submit" className="w-full" size="lg">Continue</Button>
            </form>
            <Separator/>
            <p className="text-xs text-muted-foreground">
                Don&apos;t have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={()=>setScreenState("signup")}>Signup</span>
            </p>
        </CardContent>
    </Card>
  )
}

export default SignInCard