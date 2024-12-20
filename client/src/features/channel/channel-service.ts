import { ResponseError, ValidationProblemDetails } from "@/api";
import { apiClient } from "@/api/client";
import { ApiValidationErrors } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";

export const useCreateChannel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async ({
      workspaceId,
      channelName,
    }: {
      workspaceId: number;
      channelName: string;
    }) => {
      try {
        await apiClient.workspaceApi.apiWorkspacesIdChannelsPost({
          id: workspaceId,
          createWorkspaceChannelRequest: { name: channelName },
        });
      } catch (e: ResponseError | Error | unknown) {
        if (e instanceof ResponseError) {
          if (e.response.status === 400) {
            const errors: ValidationProblemDetails = await e.response.json();
            throw new ApiValidationErrors(errors.errors, e.message);
          }
        }
        throw e;
      }
    },
  });
  return {
    createChannel: mutateAsync,
  };
};
