import axios, { type AxiosError, type AxiosRequestConfig, type AxiosInstance } from 'axios'
import type { IErrorResponse, IResponse } from '@/types/api.type'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
})
const throwOnError = ref<boolean>(false)

instance.interceptors.request.use(
  (config) => {
    if (config.headers.throwOnError !== undefined) {
      throwOnError.value = config.headers.throwOnError
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    throwOnError.value = false
    return response
  },
  (error) => {
    /**
     * Throw Unauthorized
     */
    if (error.status === 401) {
      // action to logout
    }

    const message = Array.isArray(error.response.data.data) ? error.response.data.data.join(', ') : error.response.data.data

    if (throwOnError.value) {
      // action to throw error
    }

    return Promise.reject({
      message
    })
  }
)

const error = ref<AxiosError<IErrorResponse> | null>(null)

export const useApi = () => {
  const loading = ref<boolean>(false)

  const setAuthorization = (token: string) => {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const setError = (err: AxiosError<IErrorResponse>) => {
    error.value = err
  }

  const query = <T>(url: string, query: Record<string, unknown>, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return new Promise((resolve, reject) => {
      loading.value = true

      instance.get<IResponse<T>>(url, { params: { ...query }, ...config })
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return await new Promise((resolve, reject) => {
      loading.value = true

      instance.get<IResponse<T>>(url, config)
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const post = <T>(url: string, data: Record<string, unknown> | FormData, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return new Promise((resolve, reject) => {
      loading.value = true

      instance.post<IResponse<T>>(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const put = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return new Promise((resolve, reject) => {
      loading.value = true

      instance.put<IResponse<T>>(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const patch = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return new Promise((resolve, reject) => {
      loading.value = true

      instance.patch<IResponse<T>>(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  const del = <T>(url: string, config?: AxiosRequestConfig): Promise<IResponse<T>> => {
    return new Promise((resolve, reject) => {
      loading.value = true

      instance.delete<IResponse<T>>(url, config)
        .then(({ data }) => resolve(data))
        .catch((err: AxiosError<IErrorResponse>) => {
          setError(err)
          reject(err)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    query,
    get,
    post,
    put,
    patch,
    del,
    loading,
    error,
    setAuthorization
  }
}