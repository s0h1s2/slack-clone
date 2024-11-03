import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import { SetScreenState } from "./types";

type Props = {
  setScreenState: SetScreenState;
};
const SignUpCard = ({setScreenState}: Props) => {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>Use your email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Input placeholder="Email" type="email" required />
          <Input placeholder="Password" type="password" required />
          <Input placeholder="Confirm Password" type="password" required />
          <Button type="submit" className="w-full" size="lg">
            Continue
          </Button>
        </form>
        <Separator />
        <p className="text-xs text-muted-foreground">
          Already have an account?
           <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={() => setScreenState("login")}
          >
            Signin
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
