// 该文件专门为对应组件生成action对象，也就是执行方法

import {ADD_FLAG, DEL_FLAG} from '../constart'

// 同步action：返回值action是一个对象
// const fn = ('传递的值') => {}
export const addTestAction = (data: number) => ({type: ADD_FLAG, data})
export const delTestAction = (data: number) => ({type: DEL_FLAG, data})

// 异步action：返回值action是一个函数
// 函数内一般调用同步action
// const fn = ('传递的值', '异步时间') => {}
export const asyncAddTestAction = (data: number, time: number) => {
    return (dispatch: Function) => {// store默认传递dispatch
        setTimeout(() => {
            dispatch(addTestAction(data))// 一般由同步action代替执行
        }, time)
    }
}
export const asyncDelTestAction = (data: number, time: number) => {
    return (dispatch: Function) => {// store默认传递dispatch
        setTimeout(() => {
            dispatch(delTestAction(data))// 一般由同步action代替执行
        }, time)
    }
}