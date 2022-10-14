import { extend } from 'umi-request';
import { getToken, removeToken } from './auth';
import { notification } from 'antd';
import router from 'umi/router'

interface MessageType {
    [key: number]: string
}

const codeMessage: MessageType = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const request = extend({
    timeout: 1000,
    prefix: "https://api-cdss.test.jk.com",
    errorHandler: err => {
        const { response } = err
        const close = () => {
            removeToken()
            router.push('/login')
        }
        if (response && response.status) {
            const { status } = response
            const errorText = codeMessage[status] || response.statusText;
            notification.error({
                message: errorText,
                duration: 3000
            })
            if (status === 401) {
                close()
            }
        } else {
            notification.error({
                message: '接口请求失败',
                duration: 3000
            })
        }
    }
})

request.interceptors.request.use((url, options) => {
    const headers = getToken() ? { ...options.headers, ...{ 'Authorization': getToken() || '' } } : { ...options.headers }
    return ({
        url, options: { ...options, ...{ headers: headers } }
    })
})

export default request