import axios, { AxiosError } from "axios"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const client = axios.create({
  baseURL: API_BASE_URL
})
type Method = "GET" | "POST" | "PUT" | "DELETE"

const makeRequest = async (method: Method, path: string, body?: unknown) => {
  return await fetch(path, {
    method,
    body
  })
}
export const apiClient = {
  post: (path: string, body: unknown) => {
    return makeRequest("POST", path, body)
  },
  get: (path: string) => {
    return makeRequest("GET", path)
  },
  delete: (path: string) => {
    return makeRequest("DELETE", path)
  },
  put: (path: string) => {
    return makeRequest("PUT", path)
  }
}

