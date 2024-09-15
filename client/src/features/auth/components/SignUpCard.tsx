import React from 'react'
import { AuthFlowProps } from '../types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupFormT, SignupValidationSchema } from '../validation'
import { Button } from '@/components/ui/button'

const SignUpCard = (props: AuthFlowProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormT>({
    resolver: yupResolver(SignupValidationSchema),
  })
  const onSubmit: SubmitHandler<SignupFormT> = (data) => {
    console.log(data);
  }


  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Signup to continue
        </CardTitle>
        <CardDescription>Use your email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={handleSubmit(onSubmit)} >
          <Input type="email" placeholder="Email" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>
          <Input type="password" placeholder="Password" {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
          <Button type="submit" className="w-full" size="lg">Continue</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Already have an account? <span className="text-sky-700 hover:underline cursor-pointer" onClick={() => props.setAuthState("signin")}>Sign In</span>
        </p>
      </CardContent>
    </Card >
  )
}

export default SignUpCard
