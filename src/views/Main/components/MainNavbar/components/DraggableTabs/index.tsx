import React, { useRef, useState, useEffect } from "react"

import { useNavigate, useLocation } from 'react-router-dom'
import {allRoute, firstPath} from '@/routes'

import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import type { TabsProps } from "antd"
import { Tabs } from "antd"

import TabRightExtra from '../TabRightExtra'

import bus from '@/utils/bus'

const type = "DraggableTabNode"

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
    index: React.Key;
    moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

interface TabsPropsPlus extends TabsProps {// 父组件传递的方法
    delPanes: Function,
    changePanes: Function,
    followTabKey: Function,
    handlePanes: Function,
}

const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {}
            if (dragIndex === index) {
                return {}
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: "dropping",
            }
        },
        drop: (item: { index: React.Key }) => {
            moveNode(item.index, index)
        },
    })
    const [, drag] = useDrag({
        type,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drop(drag(ref))

    return (
        <div
            ref={ref}
            style={{ marginRight: 24 }}
            className={isOver ? dropClassName : ""}
        >
            {children}
        </div>
    )
}

const DraggableTabs: React.FC<TabsPropsPlus> = (props) => {
    
    const { items = [], delPanes, changePanes, followTabKey, handlePanes } = props

    const [order, setOrder] = useState<React.Key[]>([])

    const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {

        changePanes(dragKey, hoverKey)

        const newOrder = order.slice()

        items.forEach((item) => {
            if (item.key && newOrder.indexOf(item.key) === -1) {
                newOrder.push(item.key)
            }
        })

        const dragIndex = newOrder.indexOf(dragKey)
        const hoverIndex = newOrder.indexOf(hoverKey)

        newOrder.splice(dragIndex, 1)
        newOrder.splice(hoverIndex, 0, dragKey)

        setOrder(newOrder)
    }

    const renderTabBar: TabsProps["renderTabBar"] = (
        tabBarProps,
        DefaultTabBar
    ) => (
        <DefaultTabBar {...tabBarProps}>
            {(node) => (
                <DraggableTabNode
                    key={node.key}
                    index={node.key!}
                    moveNode={moveTabNode}
                >
                    {node}
                </DraggableTabNode>
            )}
        </DefaultTabBar>
    )

    const orderItems = [...items].sort((a, b) => {
        const orderA = order.indexOf(a.key!)
        const orderB = order.indexOf(b.key!)

        if (orderA !== -1 && orderB !== -1) {
            return orderA - orderB
        }
        if (orderA !== -1) {
            return -1
        }
        if (orderB !== -1) {
            return 1
        }

        const ia = items.indexOf(a)
        const ib = items.indexOf(b)

        return ia - ib
    })

    // 隔断隔断隔断隔断隔断
    
    useEffect(() => {
        bus.addListener('removeCurrentTab', removeCurrentTab)// 绑定全局事件
        return () => {
            bus.removeListener("removeCurrentTab", removeCurrentTab)// 解绑全局事件
        }
    }, [])

    const {pathname} = useLocation()

    const navigate = useNavigate()

    const [activeKey, setActiveKey] = useState<string>('')// 当前激活 tab 面板的 key
    
    useEffect(() => {// 监听路由改变，切换到相应tab
        allRoute.filter(v => {
            if (pathname == '/') {
                v.path == firstPath && setActiveKey(v.id)
            } else {
                v.path == pathname && setActiveKey(v.id)
            }
        })
    }, [pathname])

    useEffect(() => {
        followTabKey(activeKey)
    }, [activeKey])

    const selectTab =(value: string) => {// 点击Tab -> 切换Tab、路由跳转
        setActiveKey(value)
        // allRoute.filter(v => {
        //     v.id == value && navigate(v.path)
        // })
        items.filter(v => {
            if (v.key == value) {
                const OnePane = JSON.parse(JSON.stringify(v))
                let url = OnePane.panePath
                if (Object.keys(OnePane.query).length > 0) {// 携带参数
                    url += '?'
                    for (let i in OnePane.query) {
                        url += i + '=' + OnePane.query[i]
                    }
                }
                navigate(url)
            }
        })
    }

    const onEdit = (targetKey: any, action: 'add' | 'remove') => {// 移除(或添加)Tab
        action === 'remove' && delPanes(targetKey)
    }

    const removeCurrentTab = (path_: string) => {
        const path = path_// 需要关闭Tab的path
        const deleteTab = allRoute.filter(v => v.path == path)[0]
        delPanes(deleteTab.id, deleteTab.path)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Tabs
                renderTabBar={renderTabBar} 
                items={orderItems}
                type="editable-card"
                hideAdd// 隐藏+号
                activeKey={activeKey}// 当前激活 tab 面板的 key
                onTabClick={selectTab}// Tab 被点击的回调
                onEdit={onEdit}// 移除(或添加)Tab
                tabBarExtraContent={<TabRightExtra handlePanes={handlePanes} />}
                // {...props}
            />
        </DndProvider>
    )
}

export default DraggableTabs
