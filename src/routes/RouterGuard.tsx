import {useState, useEffect, useRef, Fragment} from 'react'
import {useRoutes, useNavigate, useLocation} from 'react-router-dom'

import {connect} from 'react-redux'

import {routes, firstPath} from './index'

import {getCookie} from '@/utils/cookie'

import {MyObject} from '@/types'

import bus from '@/utils/bus'

import {message} from "antd"

function FrontendAuth(prosp: MyObject) {

    const {loginFlag} = prosp

    const element = useRoutes(routes)

    const {pathname} = useLocation()

    const navigate = useNavigate()

    // const flag: React.MutableRefObject<null | true> = useRef(null)
    // useEffect(() => {
    //     if(!flag.current){
    //         flag.current = true
    //     } else {
    //         console.log("页面更新")
    //     }
    // })

    // 路由守卫
    useEffect(() => {
        if (window.location.pathname != '/login' && !getCookie('token')) {
            bus.emit("clearLoginInfo")
            message.info('请登录')
        }
        // if (window.location.pathname == '/login' && getCookie('token')) {
        //     navigate(firstPath)
        // }
    }, [pathname])

    // useEffect(() => {
    //     setKey(nanoid())
    //     console.log('促使路由更新', loginFlag)
    // }, [loginFlag])

    // return (
    //     // <Fragment key={loginFlag}>
    //     <Fragment key={key}>
    //         {element}
    //     </Fragment>
    // )

    return element
}

export default connect(
    (state: MyObject) => ({
        loginFlag: state.loginFlag
    }),
)(FrontendAuth)
