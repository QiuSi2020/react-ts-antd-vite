// 该文件专门为对应组件生成action对象，也就是执行方法

import {User_InfoSave, User_InfoDelete} from '../constart'

import {MyObject} from '@/types'

// 传入 type: Login_Flag ， reducers文件夹里的方法里， 判断 (type == Login_Flag) 才执行
// 因为全局状态里的任何一个值变化，reducers文件夹里的全部函数都会执行
// 因此以 type 来控制
export const userInfoSave = (data: MyObject) => ({type: User_InfoSave, data})
export const userInfoDelete = (data: MyObject) => ({type: User_InfoDelete, data})
