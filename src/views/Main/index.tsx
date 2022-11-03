import React, { useState, useEffect } from "react"

import { useNavigate, useLocation } from 'react-router-dom'
import {menu, allRoute, firstPath} from '@/routes'

import MainNavbar from './components/MainNavbar'
import MainContent from './components/MainContent'
import MainHeader from './components/MainHeader'

import type { MenuProps } from "antd"
import { Menu, Tooltip, Layout } from "antd"
import * as icons from '@ant-design/icons'
import {variables} from '@/assets/style'
import {TopLeftBox, MenuBox, HeaderBox} from './style'

const { Header, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

type MenuType = {
    id: string | number,
    title: string,
    icon: string,
    pathUrl: string,
    childList: null | MenuType[]
}

type firstViewProps = {
    key: number | string,
    children: firstViewProps[] | null,
    OpenKeyPath: string[]
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
    } as MenuItem
}

const Icon = (props: { icon: string }) => {// 动态设置icon
    const { icon } = props
    const antIcon: { [key: string]: any } = icons
    return React.createElement(antIcon[icon])
}

const menuItemsCalc = (arr: MenuType[]) => {// 生成 菜单 渲染数据格式
    const newMenu: MenuItem[] = []
    for(let i=0; i<arr.length; i++) {
        const item = arr[i]
        var element: MenuItem
        if (!item.pathUrl && item.childList) {
            element = getItem(item.title, item.id, <Icon icon={item.icon} />, menuItemsCalc(item.childList))
        } else {
            element = getItem(item.title, item.id, <Icon icon={item.icon} />)
        }
        newMenu.push(element)
    }
    return newMenu
}

// var items: MenuItem[] = menuItemsCalc(menu)
// 全部菜单项
var items: MenuItem[] = menuItemsCalc(menu)

const Main: React.FC = () => {

    useEffect(() => {
        items = menuItemsCalc(menu)

        setTimeout(() => {
            setShowTooltip(false)
        }, 5000)
    }, [])

    const {pathname} = useLocation()

    const navigate = useNavigate()

    const [initOpenKey, setInitOpenKey] = useState<string[]>([])// 初始 打开的菜单
    
    const [current, setCurrent] = useState<string>('')// 选中的菜单项

    const [collapsed, setCollapsed] = useState<boolean>(false)// 菜单是否收起状态(true)

    const [copyOpenKey, setCopyOpenKey] = useState<string[]>([])// 展开的菜单项 备份

    const [showTooltip, setShowTooltip] = useState<boolean>(true)// 控制两个提示框(展示一段时间后关闭)

    useEffect(() => {// 监听路由改变，选中相应的菜单项
        // 只有侧边导航栏处于展开时 执行
        !collapsed && initView(JSON.parse(JSON.stringify(items)))

        allRoute.filter(v => {
            if (pathname == '/') {
                v.path == firstPath && setCurrent(v.id)
            } else {
                v.path == pathname && setCurrent(v.id)
            }

            // v.path == pathname && setCurrent(v.id)// 此处有个异步问题，先往子组件传递了旧的值，才设置新的值
        })
    }, [pathname])
    
    // 收起侧边导航时，如果有展开的项会有闪烁问题；收缩时关闭展开的项
    // 收起侧边导航时，保存已打开的菜单，重新展开侧边导航时 复原
    useEffect(() => {
        if (collapsed) {
            setCopyOpenKey([...initOpenKey])
            initOpenKey.splice(0, initOpenKey.length)
            setInitOpenKey(initOpenKey)
        } else {
            initOpenKey.push(...copyOpenKey)
            setInitOpenKey(initOpenKey)
        }
    }, [collapsed])

    const initView = (routeProps: firstViewProps[], parentOpenKey?: string[]) => {// 监听路由改变，打开相应的菜单

        const currentSelected = allRoute.filter(v => {
            if (pathname == '/') {
                return v.path == firstPath
            } else {
                return v.path == pathname
            }
        })[0].id// 当前路由的id
        
        if (!currentSelected) return
        
        routeProps.forEach(v => {
            if (parentOpenKey) {
                v.OpenKeyPath = [...parentOpenKey, v.key.toString()]
            } else {
                v.OpenKeyPath = [v.key.toString()]
            }
            if (v.children != null) {
                initView(v.children, v.OpenKeyPath)
            }
            if (v.OpenKeyPath.length > 1 && v.key == currentSelected) {
                initOpenKey.push(...v.OpenKeyPath)
                setInitOpenKey(initOpenKey)
            }
        })
    }

    const selectMenu = (value: {key: string}) => {// 菜单项 切换时
        setCurrent(value.key)
        const pathUrl = allRoute.filter(v => v.id == value.key)[0]
        pathUrl.path && navigate(pathUrl.path)
    }

    const changeOpenKey = (openKeys: string[]) => {
        !collapsed && setInitOpenKey([...openKeys])
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>

            {/* 侧边菜单栏 */}
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                // trigger={
                //     !collapsed
                //     ? <icons.MenuFoldOutlined />// 展开状态
                //     : <icons.MenuUnfoldOutlined />// 收起状态
                // }

                // trigger={
                //     !collapsed
                //     ? <icons.FullscreenExitOutlined />// 展开状态
                //     : <icons.ExpandOutlined />// 收起状态
                // }

                // trigger={
                //     !collapsed
                //     ? <icons.BorderRightOutlined />// 展开状态
                //     : <icons.BorderLeftOutlined />// 收起状态
                // }

                // trigger={
                //     !collapsed
                //     ? <icons.VerticalRightOutlined />// 展开状态
                //     : <icons.VerticalLeftOutlined />// 收起状态
                // }

                trigger={
                    <Tooltip
                        placement="right"
                        color={variables.themeColor}
                        open={showTooltip}
                        title="收起菜单"
                    >
                        <icons.VerticalRightOutlined style={{
                            transform: !collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 1s',
                        }} />
                    </Tooltip>
                }
            >
                {/* 左上角框 */}
                <TopLeftBox>
                    <div className="TopLeftBoxContent">
                        <div className="logo_">
                            <div className="logo_img"></div>
                        </div>
                        <div className="title_">天道酬勤</div>
                    </div>
                </TopLeftBox>

                <MenuBox>
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={items}
                        defaultOpenKeys={initOpenKey}// 展开的菜单(初始)
                        onOpenChange={changeOpenKey}
                        selectedKeys={[current]}// 选中的菜单项
                        onSelect={(value) => selectMenu(value)}
                        key={Number(collapsed) + pathname}// 当这两个值改变时，重新渲染一遍
                    />
                </MenuBox>
            </Sider>

            <Layout className="site-layout">

                {/* 顶部栏：height: 64px; */}
                <Header
                    className="site-layout-background"
                    style={{padding: 0}}
                >
                    <HeaderBox>
                        <div style={{flex: 1}}></div>
                        <MainHeader />
                    </HeaderBox>
                </Header>

                {/* Tab栏：height: 50px; */}
                <Tooltip
                    placement="topLeft"
                    color={variables.themeColor}
                    open={showTooltip}
                    title='页签可拖拽'
                >
                    <MainNavbar current={current} />
                </Tooltip>

                {/* 主体栏 */}
                <MainContent />

            </Layout>

        </Layout>
    )
}

export default Main
