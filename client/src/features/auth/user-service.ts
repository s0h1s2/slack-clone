import { ResponseError } from "@/api";
import { apiClient } from "@/api/client";
import { NetworkError, UnauthenticatedError } from "@/lib/errors";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAuthUser = () => {
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: fetchUser,
  } = useQuery({
    queryKey: ["USER_AUTH"],
    queryFn: async () => {
      try {
        const user = await apiClient.usersApi.apiUsersMeGet();
        return user;
      } catch (e: Error | ResponseError | unknown) {
        if (e instanceof ResponseError) {
          if (e.response.status == 401) {
            throw new UnauthenticatedError("User is unauthorized");
          }
          throw new NetworkError(e.message);
        }
        console.error(e);
      }
    },
    retry: 0,
  });
  return {
    user,
    isUserLoading,
    fetchUser,
    userError,
  };
};
