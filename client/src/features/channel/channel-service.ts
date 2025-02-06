import { ResponseError, ValidationProblemDetails } from "@/api";
import { apiClient } from "@/api/client";
import { ChatMessage } from "@/components/Editor";
import { ApiValidationErrors, NetworkError } from "@/lib/errors";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { useState } from "react";
const CHANNELS_QUERY_KEY = "channels";

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createChannel } = useMutation({
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
          throw new NetworkError(e.message);
        }
        throw e;
      }
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [CHANNELS_QUERY_KEY] });
    },
  });
  return {
    createChannel,
  };
};

export const useGetChannels = (workspaceId: number) => {
  const { data: channels, isLoading: isChannelsLoading } = useQuery({
    queryKey: [CHANNELS_QUERY_KEY],
    queryFn: async () => {
      try {
        const response =
          await apiClient.workspaceApi.apiWorkspacesIdChannelsGet({
            id: workspaceId,
          });
        return response.channels;
      } catch (e: ResponseError | Error | unknown) {
        if (e instanceof ResponseError) {
          throw new NetworkError(e.message);
        }
        throw e;
      }
    },
  });
  return {
    channels,
    isChannelsLoading,
  };
};
export const useGetChannelMessages = (channelId: number) => {
  const {
    data: messages,
    fetchNextPage: loadNextPage,
    isFetchingNextPage: isLoadingMore,
    isLoading: isMessagesLoading,
    hasNextPage: canLoadMore,
  } = useInfiniteQuery({
    queryKey: ["messages", channelId],
    initialPageParam: null,
    queryFn: async ({ pageParam }) => {
      try {
        const response = await apiClient.channelsApi.apiChannelIdMessagesGet({
          id: channelId,
          lastMessageId: pageParam,
        });
        return response;
      } catch (e: ResponseError | Error | unknown) {}
    },
    getNextPageParam: (page) => page?.lastMessageId,
    enabled: () => !!channelId,
  });

  return {
    messages,
    isMessagesLoading,
    loadNextPage,
    isLoadingMore,
    canLoadMore,
  };
};
export const useCreateChannelMessage = () => {
  const { channelId } = useParams({
    from: "/workspaces/$workspaceId_/channels/$channelId",
  });

  const [key, setKey] = useState(1);
  const [isCreating, setDisabled] = useState(false);
  const createMessage = async ({
    text,
    image,
    messageParentId,
  }: ChatMessage & { messageParentId?: number }) => {
    setDisabled(true);
    try {
      await apiClient.channelsApi.apiChannelIdChatPostRaw({
        id: Number(channelId),
        chat: text,
        attachment: image ?? undefined,
        parentId: messageParentId,
      });
      setKey((prev) => prev + 1);
    } catch (error: ResponseError | Error | unknown) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };
  return {
    createMessage,
    isCreating,
    key,
  };
};
