import {useEffect, Suspense} from "react";// Suspense：放置路由

// import {useRoutes} from 'react-router-dom'
// import {routes} from './routes'

import {Spin} from 'antd'

import RouterGuard from './routes/RouterGuard'

// 退出登录 所需
import {useNavigate} from 'react-router-dom'
import {resetRoute} from './routes'
import {connect} from 'react-redux'
import {clearCookie} from '@/utils/cookie'
import bus from '@/utils/bus'
import {userInfoDelete} from '@/redux/action/user_action'
import {loginOrexit} from '@/redux/action/login_action'
import {MyObject} from '@/types'
import {useAliveController} from '@/components/KeepAlive'

function App(props: MyObject) {

    // const element = useRoutes(routes)

    useEffect(() => {
        bus.addListener('clearLoginInfo', clearLoginInfo)// 绑定全局事件
        return () => {
            bus.removeListener("clearLoginInfo", clearLoginInfo)// 解绑全局事件
        }
    }, [])

    const {userInfoDelete, loginOrexit} = props

    const navigate = useNavigate()

    const {clear} = useAliveController()

    // 退出登录 -> 通过bus触发
    const clearLoginInfo = () => {
        window.localStorage.removeItem('ROUTE')// 清除本地路由信息
        resetRoute()// 路由重置
        clearCookie('token')// 清除 token
        userInfoDelete({})// 清除 用户信息
        loginOrexit(false)// 退出登录状态
        clear()// 移除全部keep Alice
        navigate('/login')// 跳转到登录页
        console.log('已退出登录')
    }
    
    return (
        <>
            <div style={{
                width: '100vw',
                // height: '100vh'
            }}>
                {/* <Suspense fallback={
                    <Spin size="large" style={{width: '100vw'}} />
                }> */}
                <Suspense fallback={
                    <Spin 
                        size="large" 
                        style={{
                            width: '100vw', 
                            height: '100vh', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center'
                        }} 
                    />
                }>
                    <RouterGuard />
                </Suspense>
            </div>
        </>
    );
}

export default connect(
    () => ({}),
    {
        userInfoDelete,
        loginOrexit
    }
)(App)
