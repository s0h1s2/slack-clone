import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SetScreenState } from "./types"
import { useForm } from "react-hook-form";
import { SignInFormSchema, SignInFormSchemaT } from "@/features/auth/validation.ts";
import { FormControl, FormField, FormItem, FormLabel, Form, FormMessage } from "@/components/ui/form.tsx";
import { yupResolver } from "@hookform/resolvers/yup"
import {apiClient} from "@/api/client.ts";
import {ResponseError} from "@/api";
import {useToast} from "@/hooks/use-toast.ts";
import {useNavigate} from "@tanstack/react-router";
type Props = {
    setScreenState: SetScreenState
}
const SignInCard = ({ setScreenState }: Props) => {
    const {toast}=useToast();
    const navigate=useNavigate()
    const form = useForm<SignInFormSchemaT>({
        resolver: yupResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    
    const handleSubmit = async (data:SignInFormSchemaT) => {
        try {
            const res=await apiClient.usersApi.apiUsersAuthPost({loginRequest:{email:data.email, password:data.password}});
            localStorage.setItem("token",res?.token);
            await navigate({to:"/workspaces"})
        }catch (e:ResponseError | Error | unknown) {
            if(e instanceof ResponseError) {
                if(e.response.status===401){
                    toast({description:"Invalid credentials",variant:"destructive",title:"Login"});
                    return;
                }
            }
            
        }
    }
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
                <form className="space-y-2.5" onSubmit={form.handleSubmit(handleSubmit)}>
                    <Form {...form}>
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" type="password"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} name="password" />
                        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>Continue</Button>
                    </Form>
                </form>
                <Separator />
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => setScreenState("signup")}>Signup</span>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard
