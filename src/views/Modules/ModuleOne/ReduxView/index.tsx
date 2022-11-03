import {useState, useEffect, useMemo} from "react"

import KeepAlive, {useActivate} from '@/components/KeepAlive'

// 引入connect，用于连接UI组件与redux
import { connect } from 'react-redux'
// 引入 redux/action 中对应文件里需要执行的方法
import {
    addTestAction,
    delTestAction,
    asyncAddTestAction,
    asyncDelTestAction,
} from '@/redux/action/ReduxView_action'

import {Button} from 'antd'

interface MyObject {
    [key: string]: any
}

function PageName(props: any) {

    useEffect(() => {
        console.log('props', props)
    }, [])

    // useActivate(() => {
    //     console.log('first')
    // })

    const {num, fn1, fn2, fn3, fn4} = props

    const add = () => {
        fn1(1)
    }

    const del = () => {
        fn2(2)
    }

    const asyncAdd = () => {
        fn3(3, 1000)
    }

    const asyncDel = () => {
        fn4(4, 1000)
    }

    return (
        <>
            <h1>Redux</h1>
            
            <h2>react-Redux</h2>
            <h3>为了把redux方法变为组件props属性</h3>
            <h4>在已有UI组件基础上创建一个容器组件</h4>
            <h5>UI组件：不使用任何redux的api，只负责页面的呈现、交互等</h5>
            <h5>容器组件：负责和redux通信，将结果交给UI组件(通过props)</h5>
            <h6>使用了react-redux，组件将能监听到redux值的变化并更新视图</h6>
            <br />
            <p>这是redux里面的值：{num}</p>
            <span>同步：</span>
            <Button type='primary' onClick={add}>+1</Button>
            -
            <Button type='primary' onClick={del}>-2</Button>
            <br />
            <br />
            <span>异步一秒：</span>
            <Button type='primary' onClick={asyncAdd}>+3</Button>
            -
            <Button type='primary' onClick={asyncDel}>-4</Button>
            <br />
            <br />
            <h3>已解决redux数据刷新页面数据丢失问题</h3>
        </>
    )
}

const PageNamePlus =  connect(
    // state为全部的状态集合
    (state: MyObject) => ({
        num: state.num,
    }), 
    {
        // 自定义名称
        fn1: addTestAction,
        fn2: delTestAction,
        fn3: asyncAddTestAction,
        fn4: asyncDelTestAction,

        // 如果前后名称相同，可简写成如下
        // addTestAction,
        // delTestAction,
        // asyncAddTestAction,
    }
)(PageName)

export default () => KeepAlive(<PageNamePlus />)
