import {UsersApi, WorkspacesApi} from "@/api/apis";
import {Configuration, ConfigurationParameters} from "@/api/runtime.ts";

const configuration: ConfigurationParameters = {
    basePath: "http://localhost:8000",
    middleware:[]
}
const apiConfig=new Configuration(configuration);
export const apiClient={
    usersApi:new UsersApi(apiConfig),
    workspaceApi:new WorkspacesApi(apiConfig)
};
export type ApiClient = typeof apiClient;
