// 存储一个 cookie (不设置有效时间时，cookie将在浏览器关闭时自动清除)
export const setCookie = (key: string, value: string, storageDays?: number) => {
    let result = ''
    if (storageDays) {
        const d = new Date();
        d.setTime(d.getTime() + (storageDays*24*60*60*1000))
        result = key + '=' + encodeURI(value) + ';path=/;expires=' + d.toUTCString()
    } else {
        result = key + '=' + encodeURI(value) + ';path=/;'
    }
    document.cookie = result
}

// 获取一个 cookie (传入一个需要获取的键值名，无则返回 '')
export const getCookie = (key: string) => {
    let result = ''
    if (document.cookie) {
        const oldCookie = document.cookie.split('; ')
        oldCookie.forEach(v => {
            const oneCookie = v.split('=')
            if (oneCookie[0] == key) {
                result = decodeURI(oneCookie[1])
            }
        })
    }
    return result
}

// 清除一个 cookie
export const clearCookie = (key: string) => {
    setCookie(key, '', -1)
}
