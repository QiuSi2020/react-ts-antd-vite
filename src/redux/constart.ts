// 用于定义redux中所有action对象中type类型的常量值

// 因为全局状态里的任何一个值变化，reducers文件夹里的全部函数都会执行
// 因此以 type 来控制函数里的执行，根据 type 判断是否继续执行

// 目的：便于维护(可能在多个文件使用同一变量)，同时防止编码单词写错

export const User_InfoSave = 'User_InfoSave'// 保存
export const User_InfoDelete = 'User_InfoDelete'// 删除

export const Login_Flag= 'Login_Flag'// 登陆

export const ADD_FLAG = '01'// 加
export const DEL_FLAG = '02'// 减
