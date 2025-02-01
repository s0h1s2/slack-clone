import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMessage = () => {
  const toast = useToast();
  const client = useQueryClient();
  const { mutate: deleteMessage, isPending: isDeleteMessageLoading } =
    useMutation({
      mutationFn: async ({ messageId }: { messageId: number }) => {
        try {
          await apiClient.messagesApi.messagesIdDelete({ id: messageId });
        } catch (error: Error | ResponseError | unknown) {
          toast.toast({
            description: "Unable to delete message",
            variant: "destructive",
          });
          console.error(error);
          throw new Error("Failed to delete message");
        }
      },
    });
  return {
    deleteMessage,
    isDeleteMessageLoading,
  };
};
export const useUpdateMessage = () => {
  const toast = useToast();
  const { mutate: updateMessage, isPending: isMessageUpdating } = useMutation({
    mutationFn: async ({
      messageId,
      body,
    }: {
      messageId: number;
      body: string;
    }) => {
      try {
        await apiClient.messagesApi.messagesIdPut({
          id: messageId,
          updateChatRequest: { message: body },
        });
      } catch (error) {
        toast.toast({
          description: "Unable to upadate message",
          variant: "destructive",
        });
      }
    },
  });
  return {
    updateMessage,
    isMessageUpdating,
  };
};
