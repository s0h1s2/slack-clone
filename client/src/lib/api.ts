import axios, { AxiosError, isAxiosError } from "axios"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const client = axios.create({
  baseURL: API_BASE_URL
})
type Method = "GET" | "POST" | "PUT" | "DELETE"
const makeRequest = async (method: Method, path: string, body?: unknown) => {
  try {
    const res = await client.request({
      method,
      url: path,
      data: body
    })
    return {
      status: res.status,
      data: res.data
    }
  } catch (e: AxiosError | unknown) {
    if (isAxiosError(e)) {
      return {
        status: e.status,
        data: e.response!.data
      }
    }
    console.error("Unknown error happend during making request" + e)
    throw e
  }
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

