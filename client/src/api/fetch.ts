import createFetchClient from "openapi-fetch";
import createFetch from "openapi-react-query";
import type {paths} from "@/api/schema";
// const baseUrl=import.meta.env.VITE_API_BASE_URL as string;

const _client=createFetchClient<paths>({baseUrl:"http://localhost:8000"});
export const $client=createFetch(_client);


