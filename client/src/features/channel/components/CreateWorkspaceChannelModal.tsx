import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCreateChannelModal } from "../store/create-channel-modal";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateChannel } from "../channel-service";
import { useMatch, useMatchRoute } from "@tanstack/react-router";
import { ApiValidationErrors } from "@/lib/errors";

const CreateWorkspaceChannelModal = () => {
  const [open, setOpen] = useCreateChannelModal();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(object({ name: string().required() })),
    defaultValues: {
      name: "",
    },
  });
  const workspaceId = useMatch({
    from: "/workspaces/$workspaceId",
    shouldThrow: false,
  });

  const { createChannel } = useCreateChannel();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createChannel({
        workspaceId: Number(workspaceId?.params.workspaceId),
        channelName: data.name,
      });
      reset();
      setOpen(false);
    } catch (e: ApiValidationErrors | Error | unknown) {
      if (e instanceof ApiValidationErrors) {
        Object.keys(e.errors).forEach((key) =>
          // @ts-ignore
          setError(key, { message: e.errors[key][0] })
        );
        return;
      }
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent aria-describedby="create-channel-form">
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            disabled={false}
            placeholder="Create a channel e.g. 'general','project-x'"
            {...register("name", {
              onChange: (value) =>
                (value.target.value = value.target.value.replace(/\s/g, "-")),
            })}
          />
          {errors.name && isDirty && (
            <p className="ml-1 text-sm text-red-500">{errors.name.message}</p>
          )}
          <div className="flex justify-end">
            <Button disabled={isSubmitting} type="submit">
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceChannelModal;
