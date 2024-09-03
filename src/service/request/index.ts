import { TOKEN } from '@/globle/constant'
import { localCache } from '@/utils/cache'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { HYRequestConfig } from './type'

// 拦截器: 蒙版Loading/token/修改配置

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class HYRequest {
  instance: AxiosInstance

  // request实例 => axios的实例
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = localCache.getCache(TOKEN)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        if (res.status === 200 || res.status === 201) {
          return res.data
        } else if (res.status === 401) {
          ElMessage.error('抱歉，您尚未登录或登录已过期，请重新登录')
          // 如果需要跳转到登录页或其他操作，可以在这里添加
          //window.location.href = '/login' // 示例：重定向到登录页
        } else if (res.status === 400) {
          ElMessage.error('服务器发生错误，请稍后重试')
        } else {
          throw new Error(`HTTP 错误 ${res.status}`)
        }
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )

    // // 针对特定的hyRequest实例添加拦截器
    // this.instance.interceptors.request.use(
    //   config.interceptors?.requestSuccessFn,
    //   config.interceptors?.requestFailureFn
    // )
    // this.instance.interceptors.response.use(
    //   config.interceptors?.responseSuccessFn,
    //   config.interceptors?.responseFailureFn
    // )
  }

  // 封装网络请求的方法
  // T => IHomeData
  request<T = any>(config: HYRequestConfig<T>) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
