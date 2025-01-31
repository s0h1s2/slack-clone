import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { NetworkError } from "@/lib/errors";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMessage = () => {
  const toast = useToast();
  const { mutate: deleteMessage, isPending: isDeleteMessageLoading } =
    useMutation({
      mutationFn: async (messageId: number) => {
        try {
          await apiClient.messagesApi.messagesIdDelete({ id: messageId });
        } catch (error: Error | ResponseError | unknown) {
          toast.toast({
            description: "Unable to delete message",
            variant: "destructive",
          });
          console.error(error);
        }
      },
    });
  return {
    deleteMessage,
    isDeleteMessageLoading,
  };
};
export const useUpdateMessage = ({
  messageId,
  body,
}: {
  messageId: number;
  body: string;
}) => {};
