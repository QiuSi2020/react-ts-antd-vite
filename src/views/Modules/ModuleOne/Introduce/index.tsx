import {useState, useEffect, useMemo} from "react"

import {useNavigate, useLocation} from 'react-router-dom'

import KeepAlive, {useActivate} from '@/components/KeepAlive'

import {Button} from 'antd'

function PageName() {

    // 结构：hook -> state -> compute、watch -> function

    useEffect(() => {
        console.log('挂载')
        initView()
        return () => {
            console.log('卸载')
        }
    }, [])

    useActivate(() => {
        // console.log('激活')
        initView()
    })

    const navigate = useNavigate()

    const toPageOne = () => {
        // navigate('/pageone')
    }

    const test = () => {
        // console.log('first')
    }

    // 首次进入页面，只触发useEffect，切换页面才会触发useActivate
    // 所以，需定义一个初始化函数(放置于底部)
    const initView = () => {
        
    }

    return (
        <>
            <h1>项目介绍</h1>
            <div style={{
                display: 'flex',
            }}>
                <div style={{flex: 1}}>
                    <h2>使用技术主要有：
                        <li>React 18</li>
                        <li>TypeScript</li>
                        <li>Ant Design</li>
                        <li>Vite3.0</li>
                        <li>React-router v6</li>
                        <li>Redux</li>
                        <li>Axios</li>
                    </h2>
                </div>
                <div style={{flex: 1}}>
                    <h2>已实现功能：
                        <li>环境配置</li>
                        <li>动态菜单路由</li>
                        <li>Keep Alive功能</li>
                        <li>路由重定向</li>
                        <li>跨域</li>
                    </h2>
                </div>
            </div>
            
            {/* <h2>使用技术主要有：React 18 + TypeScript + Ant Design + Vite3.0 + React-router v6 + Redux + Axios</h2>
            <h2>已实现功能：环境配置、动态路由、Keep Alive功能、路由重定向、跨域</h2> */}
            
            <h2>Tab栏与浏览器Tab栏相似，可对单个Tab进行长按拖拽(请在PC端浏览)</h2>
            <h3>另一个账号 -&gt; 账号：12345，密码：12345。 具有不同路由</h3>
        </>
    )
}

export default () => KeepAlive(<PageName />)
