// import {allRoute} from '@/routes'

// 传入(旧数组([1,2,3])，新数组([3,4,5])，对比属性名),对比新数组相对于旧数组新增了哪些([3,4])？减少了哪些([1,2])？
// (刚进入页面时，手动备份一份旧数组)
// export function contrastArray(oldArr, newArr, name) {
//     var oldList = oldArr.map(p => p[name]);
//     var newList = newArr.map(p => p[name]);
//     var obj = {};
//     obj.addArr = newArr.filter(p => !oldList.includes(p[name]));
//     obj.reduceArr = oldArr.filter(p => !newList.includes(p[name]));
//     return obj;
// };

// 防抖,只执行最后一次任务
// 用法一：const func_One = debounce_(1000, func_Two):在1000毫秒后执行func_Two
// 用法二：const func_Three = debounce_(1000) -> func_Three(func_Five):在1000毫秒后执行func_Three中的方法
export function debounce_(timeout: number, Fn?: Function) {
    // var timer: NodeJS.Timer
    var timer: any
    return function(fn?: Function) {
        clearTimeout(timer)
        timer = setTimeout(() => {
            Fn ? Fn() : fn && fn()
            // console.log('防抖成功')
        }, timeout)
    }
}

// 节流(等待某一任务执行完成时，再执行下一次任务)
// export function throttle(fn) {
//     var flag = true
//     return function() {
//         if(!flag) { return }
//         flag = false
//         setTimeout(() => {
//             fn()
//             console.log('节流成功');
//             flag = true
//         }, 1000)
//     }
// }

// 检测数据类型，返回相应字符串; Object/Array/String/Boolean/Number/Null/Undefined
// export function TestDataType(obj) {
//     return Object.prototype.toString.call(obj).split("").slice(8, Object.prototype.toString.call(obj).split("").length - 1).join("")
// }

//判断是否是图片
// export function checkImgType(fileName) {
//     //用文件名name后缀判断文件类型，可用size属性判断文件大小不能超过500k
//     // 前端直接判断的好处，免去服务器的压力。 
//     if (!/\.(jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)) {
//         return false;
//     } else {
//         return true;
//     }
// }

// 字符串 加密
export function toCode(value: string) {
    var keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678"
    var kleng = keys.length
    var kstr = keys.split("")
    var v = "", cat, cat1, cat2, cat3
    for (var i = 0; i <value.length; i++) {
        cat = value.charCodeAt(i)
        cat1 = cat % kleng
        cat = (cat - cat1) / kleng
        cat2 = cat % kleng
        cat = (cat - cat2) / kleng
        cat3 = cat % kleng
        v += kstr[cat3] + kstr[cat2] + kstr[cat1]
    }
    return v
}

// 字符串 解密
export function fromCode(value: string) {
    var keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678"
    var kleng = keys.length
    var alen, cat1, cat2, cat3, num = 0, arr
    arr = new Array(Math.floor(value.length / 3))
    alen = arr.length
    for (var i = 0; i < alen; i ++) {
        cat1 = keys.indexOf(value.charAt(num))
        num ++
        cat2 = keys.indexOf(value.charAt(num))
        num ++
        cat3 = keys.indexOf(value.charAt(num))
        num ++
        arr[i] = cat1 * kleng * kleng + cat2 * kleng + cat3
    }
    alen = eval("String.fromCharCode(" + arr.join(',') + ")")
    return alen
}
