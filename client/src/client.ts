import {Configuration, UsersApi} from "@/api";

const baseUrl=import.meta.env.VITE_BASE_API_URL as string;

const config=new Configuration({basePath:baseUrl.trimEnd()});

export const usersApi=new UsersApi(config);

