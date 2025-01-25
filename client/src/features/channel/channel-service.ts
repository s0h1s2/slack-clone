import { ResponseError, ValidationProblemDetails } from "@/api";
import { apiClient } from "@/api/client";
import { ApiValidationErrors, NetworkError } from "@/lib/errors";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
  });

  return {
    messages,
    isMessagesLoading,
    loadNextPage,
    isLoadingMore,
    canLoadMore,
  };
};
