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
import { useForm } from "react-hook-form";
import { SignUpFormSchema, SignUpFormSchemaT } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {$client} from "@/api/fetch.ts";
import {useToast} from "@/hooks/use-toast.ts";

type Props = {
  setScreenState: SetScreenState;
};
const SignUpCard = ({ setScreenState }: Props) => {
    const {toast}=useToast();
    
  const form = useForm<SignUpFormSchemaT>({
    resolver: yupResolver(SignUpFormSchema)
  });
  const {isPending,mutateAsync,error,isError}=$client.useMutation("post","/api/Users/createuser");
  
  const onSubmit = async (data: SignUpFormSchemaT) => {
      try{
          await mutateAsync({body:data})
          toast({title:"Sign up successfully",description:"Successfully registered",variant:"success",});
      }catch (e) {
          if(isError){
              Object.keys(error?.errors).map(field=>form.setError(field,{message:error?.errors[field]}));
          }     
          
      }
  }
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>Use your email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} name="email" />

            <FormField control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} name="name" />

            <FormField control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} name="password" />

            <FormField control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} name="confirmPassword" />

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              Continue
            </Button>
          </form>
        </Form>
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
    </Card >
  );
};

export default SignUpCard;
