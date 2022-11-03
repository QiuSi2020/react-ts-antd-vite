// 创建一个为组件服务的reducer，本质是一个函数
// reducer会接收两个参数，分别为：之前的状态(preState)，动作对象(action)

import {ADD_FLAG, DEL_FLAG} from '../constart'

// 初始化状态
const initState = 1
// const initState = {id: '001', name: '姓名'}
// const initState = [1, 2, 3, 4, 5]

type actionProps = {
    type: string | number
    data: number
}

export default (preState=initState, action: actionProps) => {
    
    // type: 对应 constart 文件中的变量, 控制语句执行
    // data: 传递的值
    const {type, data} = action
    
    // 根据type
    switch (type) {
        case ADD_FLAG:// '01'加
            preState += data
            break;

        case DEL_FLAG:// '02'减
            preState -= data
            break;
    
        default:
            break;
    }
    return preState
}