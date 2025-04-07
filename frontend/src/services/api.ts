import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import { tokenService } from '@/services'

export const apiService = (apiUrl = "http://127.0.0.1:8000/api/v1") => {

const authToken = tokenService()

const instance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as CreateAxiosDefaults)

instance.interceptors.request.use(putTokenInToHeader)

const formInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json'
  }
} as CreateAxiosDefaults)

formInstance.interceptors.request.use(putTokenInToHeader)

async function putTokenInToHeader(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const token: string | null = await authToken.get()

  if (token) {
    config.headers!['Authorization'] = `Token ${token}`
  }
  
  return config
}

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

async function formPost<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await formInstance.post(url, data, config as AxiosRequestConfig<T>))
}

async function formPatch<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
  return formattingResponse(await formInstance.patch(url, data, config as AxiosRequestConfig<T>))
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
    del,
    formPost,
    formPatch
  }
}