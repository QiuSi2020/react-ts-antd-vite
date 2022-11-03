/**集合全部 全局状态 Reducer*/

import {combineReducers} from 'redux'

// 引入各个组件所属的全局状态变量
import users from './user_reducer'
import loginFlag from './login_reducer'
import num from './ReduxView_reducer'

// 存储全部的reducers
export default combineReducers({
    users: users,
    loginFlag: loginFlag,
    num: num,
})