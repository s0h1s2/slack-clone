import { UsersApi, WorkspacesApi, ChannelApi } from "@/api/apis";
import {
  Configuration,
  ConfigurationParameters,
  FetchParams,
  Middleware,
  RequestContext,
} from "@/api/runtime.ts";
const authMiddleware: Middleware = {
  pre(context: RequestContext): Promise<FetchParams | void> {
    const token = localStorage.getItem("token");
    context.init.headers['Authorization'] = `Bearer ${token}`;
    
    return Promise.resolve({
      url: context.url,
      init: context.init,
    });
  },
};
const configuration: ConfigurationParameters = {
  basePath: "http://localhost:8000",
  middleware: [authMiddleware],
};

const apiConfig = new Configuration(configuration);

export const apiClient = {
  usersApi: new UsersApi(apiConfig),
  workspaceApi: new WorkspacesApi(apiConfig),
  channelsApi: new ChannelApi(apiConfig),
};
export type ApiClient = typeof apiClient;
