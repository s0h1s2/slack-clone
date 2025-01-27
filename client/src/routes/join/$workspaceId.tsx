import PageLoading from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useGetWorkspacePublicInfo,
  useJoinWorkspace,
} from "@/features/workspace/hooks/workspace-queries";
import { ApiValidationErrors } from "@/lib/errors";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/join/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const { isWorkspaceLoading, workspace } = useGetWorkspacePublicInfo(
    Number(workspaceId)
  );
  const { joinWorkspace, isJoiningWorkspace } = useJoinWorkspace();
  const form = useForm({
    defaultValues: {
      joinCode: "",
    },
  });
  const navigate = useNavigate();
  const handleJoinCodeSubmit = form.handleSubmit(async (data) => {
    try {
      await joinWorkspace({
        id: Number(workspaceId),
        joinWorkspaceRequest: { joinCode: data.joinCode },
      });
      navigate({ to: "/workspaces/$workspaceId", params: { workspaceId } });
    } catch (e: ApiValidationErrors | Error | unknown) {
      if (e instanceof ApiValidationErrors) {
        const firstKey = Object.keys(e.errors)[0];
        form.setError(firstKey, { message: e.errors[firstKey][0] });
      }
    }
  });
  if (isWorkspaceLoading) return <PageLoading />;
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white rounded-lg shadow-md p-8 ">
      <img src="/logo.svg" width={60} height={60} />
      <div className="flex flex-col gap-y-4 items-center justify-center mx-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join {workspace?.name}</h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <Form {...form}>
          <FormField
            control={form.control}
            name="joinCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    containerClassName={cn(isJoiningWorkspace && "opacity-25")}
                    onComplete={handleJoinCodeSubmit}
                    maxLength={8}
                    {...field}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>Please enter the join code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </div>
      <div className="flex gap-x-4">
        <Button size="lg" variant="outline" asChild>
          <Link to="/workspaces">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
