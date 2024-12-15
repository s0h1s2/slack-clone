import { UsersApi, WorkspacesApi } from "@/api/apis";
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
    return Promise.resolve({
      url: context.url,
      init: {
        ...context.init,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    });
  },
};
const configuration: ConfigurationParameters = {
  basePath: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  middleware: [authMiddleware],
};

const apiConfig = new Configuration(configuration);

export const apiClient = {
  usersApi: new UsersApi(apiConfig),
  workspaceApi: new WorkspacesApi(apiConfig),
};
export type ApiClient = typeof apiClient;
