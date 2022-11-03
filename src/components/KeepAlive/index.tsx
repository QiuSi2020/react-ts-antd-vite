import { ReactNode } from 'react'

import {useLocation} from 'react-router-dom'

import KeepAlive, { useActivate, useUnactivate, useAliveController } from 'react-activation'

const Keep_Alive = (element: ReactNode) => {
    return (
        <KeepAlive 
            name={useLocation().pathname}// 以pathname作为缓存节点的名称
            saveScrollPosition="screen"// 记录滚动位置
            // 全局唯一且不变的缓存 id 标识，以确保缓存的稳定性
            // cacheKey='123456789'
        >
            {element}
        </KeepAlive>
    )
}

export { useActivate, useUnactivate, useAliveController }

export default Keep_Alive

// const {drop, dropScope, refresh, refreshScope, clear, getCachingNodes} = useAliveController()

// drop(v.name)// 清空命中的节点(不清空嵌套的、未命中的节点)
// dropScope(v.name)// 清空命中的节点(嵌套的所有节点)
// refresh(v.name)// 刷新命中的节点(不清空嵌套的、未命中的节点)
// refreshScope(v.name)// 刷新命中的节点(嵌套的所有节点)
// clear()// 将清空所有缓存中的 KeepAlive
