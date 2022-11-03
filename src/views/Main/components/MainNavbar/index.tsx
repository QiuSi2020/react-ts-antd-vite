import React, { useState, useEffect, useMemo } from "react"

import { useNavigate, useLocation } from 'react-router-dom'
import {allRoute, firstPath} from '@/routes'

import DraggableTabs from './components/DraggableTabs'

import {Navbar} from './style'

import {useAliveController} from '@/components/KeepAlive'

import bus from '@/utils/bus'

import qs from 'qs'// 处理search方式传参(qs.parse()、qs.stringify())

type PanesProps = {
    title: string,
    key: string,

    panePath?: string,
    query?: any
}

type PropsObj = {
    current?: string,
}

const App: React.FC<PropsObj> = ({current}) => {// current：由另一个页面的组件传递过来的值

    const navigate = useNavigate()

    const {pathname, search} = useLocation()

    const {dropScope, getCachingNodes} = useAliveController()

    const [tabKey, setTabKey] = useState<string>('')// 当前激活 tab 面板的 key

    const [panes, setPanes] = useState<PanesProps[]>([])// 总的 Tab栏

    // 当前的Tab的路由信息
    const CurrentTab = useMemo(() => {
        return allRoute.filter(v => v.path == pathname)[0]
    },[pathname])

    useEffect(() => {// 点击 菜单项，生成Tab
        if (!current) return// current：点击Tab的key

        const searchParamsData: any = qs.parse(search.slice(1))// 处理path携带参数
        
        const chooseTab = allRoute.filter(v => v.id == current)[0]
        const YesOrNo = panes.findIndex(v => v.key == chooseTab.id)// Tab的下标
        if (YesOrNo === -1 && chooseTab) {// 不存在此Tab
            const newTab = {
                title: chooseTab.title,
                key: chooseTab.id,
                panePath: pathname,
                query: searchParamsData
            }
            // 在当前Tab后续生成新的Tab!!!
            const index = panes.findIndex(v => v.key == tabKey)// 当前选中Tab的下标
            setPanes(panes => [...panes.slice(0, index+1), newTab, ...panes.slice(index+1, panes.length)])
        }
    }, [current])

    useEffect(() => {
        bus.emit("fromMainNavbar", panes)
    }, [panes])
    
    // 点击 删除 Tab
    const delPanes = (val: string, path_?: string) => {// path_为应对有时当前pathname不准确的情况

        removeKeepAlive(val)

        const tabIndex = panes.findIndex(v => v.key == val)// 点击Tab的下标
        
        const newPanes = panes.filter(v => v.key != val)// 新的Tab数组
        
        if (panes.length <= 1) {// 如果只剩一个Tab
            if (allRoute[0].id == panes[tabIndex].key) {// 且是第一个菜单项，不再执行以下步骤
                console.log('只剩一个Tab页,且为首页')
                return
            } else {                                    // 且不是第一个菜单项，清空 Tab栏，跳转到首页
                setPanes([])
                navigate(allRoute[0].path)
            }
        } else {
            setPanes(newPanes)
            const currentPanes = allRoute.filter(v => v.id == val)[0]// 点击Tab路由的全部信息

            if (path_) {
                if (currentPanes.path != path_) return// 如果要删除的Tab不是当前路由的Tab，则跳过下面路由跳转的操作
            } else {
                if (currentPanes.path != pathname) return// 如果要删除的Tab不是当前路由的Tab，则跳过下面路由跳转的操作
            }
            // const fallbackPage = '/pagefour'// 上一页路由(目前这个值无法获取到)
            // const fallbackTab = allRoute.filter(v => v.path == fallbackPage)[0]// 上一页的路由信息
            // if (panes.some(s => s.key == fallbackTab.id)) {// 上一页路由的id存在于panes中, 就跳转到上一页
            //     navigate(-1)
            // } else {
            // 如果是第一个Tab，就跳转到下一个Tab，否则跳转到上一个Tab
            allRoute.forEach(v => {
                if (tabIndex == 0) {
                    v.id == panes[1].key && navigate(v.path)
                } else {
                    v.id == panes[tabIndex - 1].key && navigate(v.path)
                }
            })
            // }
        }
    }

    const removeKeepAlive = (key: string) => {
        const clickTab = allRoute.filter(v => v.id == key)[0]// 移除的Tab
        const allKeepAlive = getCachingNodes()// 获取所有缓存中的节点
        allKeepAlive.forEach(v => {
            if (v.name == clickTab.path) {
                dropScope(v.name)// 清空命中的节点(嵌套的所有节点)
            }
        })
    }

    const changePanes = (dragKey: string, hoverKey: string) => {// 拖拽Tab，Tab数据顺序进行相应调整
        if (dragKey != hoverKey) {
            const delDndex = panes.findIndex(v => v.key == dragKey)
            const delObj = panes[delDndex]
            const addIndex = panes.findIndex(v => v.key == hoverKey)
            // 原来的删除
            panes.splice(delDndex, 1)
            // 往选择点插入
            panes.splice(addIndex, 0, delObj)
            setPanes([...panes])
        }
    }

    const followTabKey = (tabKey_: string) => {
        setTabKey(tabKey_)
    }

    const handlePanes = (flagName: string) => {// 额外操作按钮：操作Tab栏

        const panesIndex = panes.findIndex(f => f.key == CurrentTab.id)// 当前Tab在panes中的下标
        
        var newPanes_: PanesProps[] = []

        switch (flagName) {
            case 'left':
                newPanes_ = panes.filter((v, index) => index < panesIndex)
                break;
                
            case 'right':
                newPanes_ = panes.filter((v, index) => index > panesIndex)
                break;

            case 'other':
                newPanes_ = panes.filter((v, index) => index != panesIndex)
                break;
                
            default:
                break;
        }
        
        if (newPanes_ && newPanes_.length > 0) {
            for(let i=0; i<newPanes_.length; i++) {
                removeKeepAlive(newPanes_[i].key)
            }
            setPanes(panes.filter(v => v.key == CurrentTab.id))
        }
    }
    
    return (
        <Navbar>
            {/* 需 重新渲染 一遍的问题(key值) */}
            {/* 应该是key值没变化，Tab栏自动往后添加了 */}
            {/* 正常操作行得通，拖拽一下就会产生问题，可能是这组件本身的问题 */}

            <DraggableTabs
                delPanes={delPanes}
                changePanes={changePanes}
                followTabKey={followTabKey}
                handlePanes={handlePanes}
                items={
                    panes.map(p => ({
                        label: p.title,
                        key: p.key,
                        // children: <div>Tab内容</div>
                        panePath: p.panePath,
                        query: p.query
                    }))
                }
                key={panes.length}
            />
        </Navbar>
    ) 
}

export default App
