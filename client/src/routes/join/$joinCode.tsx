import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/join/$joinCode')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white rounded-lg shadow-md p-8 ">
    <img src='/logo.svg' width={60} height={60} />
    <div className="flex flex-col gap-y-4 items-center justify-center mx-w-md">
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h1 className='text-2xl font-bold'>Join Workspace</h1>
        <p className="text-md text-muted-foreground">Enter the workspace code to join</p>
      </div>
      <InputOTP maxLength={8} autoFocus>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
          <InputOTPSlot index={6} />
          <InputOTPSlot index={7} />
        </InputOTPGroup>
      </InputOTP>
    </div>
    <div className="flex gap-x-4">
      <Button size="lg" variant="outline" asChild>
        <Link to='/workspaces'>
          Go Back Home
        </Link>
      </Button>
    </div>
  </div>
}
