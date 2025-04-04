import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { tokenService } from '../services'

export const apiService = () => {

const authToken = tokenService()
const apiUrl: string = 'http://127.0.0.1:8000/api/v1'

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as CreateAxiosDefaults)

instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token: string | null = await authToken.get()

  if (token) {
    config.headers!['Authorization'] = `Token ${token}`
  }
  
  return config
})

async function get<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await instance.get(url, config as AxiosRequestConfig<T>))
}

async function post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await instance.post(url, data, config as AxiosRequestConfig<T>))
}

async function put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await instance.put(url, data, config as AxiosRequestConfig<T>))
}

async function patch<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await instance.patch(url, data, config as AxiosRequestConfig<T>))
}

async function del<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await instance.delete(url, config as AxiosRequestConfig<T>))
}

function formattingResponse<T = any>(response: AxiosResponse<T>): T {
  return response.data
}

  return {
    apiUrl,
    instance,
    get,
    post,
    put,
    patch,
    del
  }
}