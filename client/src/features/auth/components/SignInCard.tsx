import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoginFormT, LoginValidationSchema } from '../validation'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, SubmitHandler } from 'react-hook-form'
import { AuthFlowProps } from '../types'
import { createUser, loginUser } from '../service'
import { pipe } from 'fp-ts/pipeable'
import { match } from 'fp-ts/Either'
import { matchError } from '@/lib/adt'
import { toast } from 'react-toastify'

const SignInCard = (props: AuthFlowProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormT>({
    resolver: yupResolver(LoginValidationSchema),
  })
  const onSubmit: SubmitHandler<LoginFormT> = async (data) => {
    pipe(
      await loginUser(data.email, data.password),
      match(
        matchError({
          UnauthorizedError: () => toast("Invalid crendentials"),
          HttpError: (e) => console.log(`HTTP ERROR:${e}`)
        }),
        (e) => {
          console.log(e.accessToken)
          // do stuff
        }
      )
    )
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Login to continue
        </CardTitle>
        <CardDescription>Use your email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)} >
          <Input type="email" placeholder="Email" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>
          <Input type="password" placeholder="Password" {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
          <Button type="submit" className="w-full" size="lg">Continue</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => props.setAuthState("signup")}>Sign Up</span>
        </p>
      </CardContent>
    </Card >
  )
}

export default SignInCard
