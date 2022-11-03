let APP_URL = null// 接口前缀

const NODE_ENV = import.meta.env.VITE_NODE_ENV

if (NODE_ENV === 'dev') {
    // 开发环境
    APP_URL = 'https://baidu.com/'
} else if (NODE_ENV === 'test') {
    // 测试环境
    APP_URL = 'https://baidu.com/'
} else if (NODE_ENV === 'production') {
    // 生产环境
    APP_URL = 'https://baidu.com/'
}

export default APP_URL

const $url: string = '1'
const BLACK_LIST_PATH: string = '1'
export {$url, BLACK_LIST_PATH}
