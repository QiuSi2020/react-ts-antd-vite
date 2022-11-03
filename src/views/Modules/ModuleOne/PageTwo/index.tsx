import {useEffect} from "react"

import {useNavigate, useLocation} from 'react-router-dom'

import {Button, Space} from 'antd'

import KeepAlive, {useActivate, useUnactivate, useAliveController} from '@/components/KeepAlive'

import bus from '@/utils/bus'

function PageTwo() {

    useEffect(() => {
        console.log('页面二挂载了')
        return () => {
            console.log('页面二卸载了')
        }
    }, [])

    useActivate(() => {
        // alert('页面一 激活')
        console.log('页面二 激活')
    })

    useUnactivate(() => {
        // alert('页面一 失活')
        console.log('页面二 失活')
    })
    
    const {pathname} = useLocation()
    
    const navigate = useNavigate()

    const {drop, dropScope, refresh, refreshScope, clear, getCachingNodes} = useAliveController()

    const goPageOne = () => {
        navigate('/pageone')
    }

    const toPageFour = () => {
        navigate('/pagefour')
    }

    const removeCurrentTab = () => {
        bus.emit("removeCurrentTab", pathname)
    }

    const clearPageOne = () => {
        // drop('pageone')// 清空命中的节点(不清空嵌套的、未命中的节点)
        dropScope('/pageone')// 清空命中的节点(嵌套的所有节点)
        // refresh('pageone')// 刷新命中的节点(不清空嵌套的、未命中的节点)
        // refreshScope('pageone')// 刷新命中的节点(嵌套的所有节点)
        // clear()// 将清空所有缓存中的 KeepAlive
        // getCachingNodes()// 获取所有缓存中的节点
    }

    return (
        <>
            <h1>页面二</h1>
            <Space>
                <Button onClick={() => goPageOne()}>到页面一</Button>
                <Button onClick={() => toPageFour()}>到页面四</Button>
                <Button onClick={() => removeCurrentTab()}>传入当前pathname,移除对应Tab</Button>
            </Space>
        </>
    )
}

export default () => KeepAlive(<PageTwo />)
