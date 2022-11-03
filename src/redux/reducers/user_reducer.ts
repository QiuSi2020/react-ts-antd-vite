import {User_InfoSave, User_InfoDelete} from '../constart'

import {MyObject} from '@/types'

interface actionProps  {
    type: string | number
    // 定义 data 数据类型
    data: MyObject
}

const initState = {
    id: '', 
    name: ''
}

// 没有确切对应的方法，只要全局状态里的任意一个值发生变化，其他全部reducer里的方法都会执行
// 以 type 来控制是否执行
export default (preState: MyObject = initState, action: actionProps) => {

    // type: 对应 constart 文件中的变量, 控制语句执行
    // data: 传递的值
    const {type, data} = action

    switch (type) {
        case User_InfoSave:
            preState = data
            break

        case User_InfoDelete:
            preState = initState
            break
    
        default:
            break
    }

    return preState
}