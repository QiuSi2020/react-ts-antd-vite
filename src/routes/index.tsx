import {lazy} from "react"
import {Navigate} from 'react-router-dom'
import {nanoid} from 'nanoid'// 生产随机id插件
import {toCode, fromCode} from '@/utils/index'

import {getCookie} from '@/utils/cookie'
import {fakeRouteOne, fakeRouteTwo} from './fakeRoute'

type MenuType = {
    id: string,
    title: string,
    icon: string,
    pathUrl: string,
    childList: null | MenuType[]
}

type RouteProps = {
    path: string,
    element: React.ReactNode,
    children?: RouteProps[]
}

interface allRouteProps extends RouteProps {
    title: string,
}

type flatMenuProps = {
    id: string,
    path: string,
    title: string,
}

type lazyLoadProps = {
    [key: string]: React.LazyExoticComponent<React.ComponentType>
}

// vite动态导入插件(貌似只支持vue): https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
// const moduleImport = import.meta.glob("../views/**/**.tsx")// 获取该文件夹下全部模块导入，懒加载方式

// 路由模块导入(懒加载方式)（伴有懒加载过程的动画）
// const lazyLoad = (modulePath: string): React.ReactNode => {
//     const Module = lazy(() => import(/* @vite-ignore */'../views/Modules/' + modulePath))
//     return <Module />
// }

// 路由虽是动态，但vite不支持此种方式(主要是element方面,貌似支持Vue的)
// 先将所有菜单项的路由都以来加载的方式导入一遍，后续通过返回的数据里的字符串作为键名获取对应的模块
const MenuLazyLoad: lazyLoadProps = {// 菜单懒加载模块(先导入全部可能需要 菜单项 路由模块)
    'ModuleOne/Introduce': lazy(() => import('@/views/Modules/' + 'ModuleOne/Introduce')),
    'ModuleOne/PageOne': lazy(() => import('@/views/Modules/' + 'ModuleOne/PageOne')),
    'ModuleOne/PageTwo': lazy(() => import('@/views/Modules/' + 'ModuleOne/PageTwo')),
    'ModuleOne/PageThree': lazy(() => import('@/views/Modules/' + 'ModuleOne/PageThree')),
    'ModuleOne/PageDetail': lazy(() => import('@/views/Modules/' + 'ModuleOne/PageDetail')),
    'ModuleOne/ReduxView': lazy(() => import('@/views/Modules/' + 'ModuleOne/ReduxView')),
}

const ViewLoad: lazyLoadProps = {// 页面懒加载模块(先导入全部可能需要 页面 路由模块)
    'ModuleOne/PageFour': lazy(() => import('@/views/Modules/' + 'ModuleOne/PageFour')),
    'ModuleOne/SearchRouting': lazy(() => import('@/views/Modules/' + 'ModuleOne/SearchRouting')),
    'ModuleOne/StateRouting': lazy(() => import('@/views/Modules/' + 'ModuleOne/StateRouting')),
}

const getViewLoad = (val: string) => {
    const Amodule = ViewLoad[val]
    return <Amodule />
}

// 页面路由(手动引入)(这里才是实际引入到路由里的位置)
const pageRoutes: allRouteProps[] = [
    {
        // element: lazyLoad('../views/Modules/ModuleOne/PageFour'),
        path: '/pagefour',
        element: getViewLoad('ModuleOne/PageFour'),
        title: '页面四'
    },
    {
        path: '/searchrouting',
        element: getViewLoad('ModuleOne/SearchRouting'),
        title: 'search 接收'
    },
    {
        path: '/staterouting',
        element: getViewLoad('ModuleOne/StateRouting'),
        title: 'state 接收'
    },
]

// 隔断隔断隔断隔断隔断隔断(一般只需修改以上部分，不用改动此处以下部分)
// 隔断隔断隔断隔断隔断隔断(一般只需修改以上部分，不用改动此处以下部分)
// 隔断隔断隔断隔断隔断隔断(一般只需修改以上部分，不用改动此处以下部分)

// 基础路由
const Login = lazy(() => import('@/views/Login'))
const Main = lazy(() => import('@/views/Main'))
const NotFound = lazy(() => import('@/views/404'))
const BlankView = lazy(() => import('@/views/Modules/ModuleOne/BlankView'))

// 初始路由
const basisRoutes: RouteProps[] = [
    {
        path: '*',// 重定向
        element: <Navigate to="/login" replace />// 使用replace跳转
    },
    {
        path: '',// 默认指向
        element: <Navigate to="/login" replace />
    },
    {
        // path: '/login*',// *：严格匹配
        path: '/login',
        element: <Login />
    },
]

let menu: MenuType[] = []// 菜单项结构数据（用于生成动态路由）

let menuRoutes: RouteProps[] = []// 菜单项路由导入

let allRoute: flatMenuProps[] = []// 全部路由(扁平数组)

const menuCalc = (arr: MenuType[]) => {
    for(let i=0; i<arr.length; i++) {
        const item = arr[i]
        if (!item.pathUrl && item.childList) {       // 满足 是一个菜单
            menuCalc(item.childList)
        } else if (item.pathUrl && !item.childList) {// 满足 是一条路由
            const Path_ = item.pathUrl.split('/')
            const path = '/' + Path_[Path_.length - 1].toLowerCase()

            // const Element = lazy(() => import(/* @vite-ignore */'../views/Modules/' + item.pathUrl))
            const Element = MenuLazyLoad[item.pathUrl] 

            const ePath = {
                path: path,
                element: <Element />,
            }
            menuRoutes.push(ePath)
        } else {
            alert(`路由数据格式出现问题！`)
            console.log('路由数据格式出现问题！', item)
        }
    }
}

const FlatMenuCalc = (arr: MenuType[]) => {
    if (Object.prototype.toString.call(arr) === "[object Array]") {
        arr.forEach(v => {
            if (v.pathUrl && !v.childList) {// 判断是一条路由
                const Path_ = v.pathUrl.split('/')
                const path = '/' + Path_[Path_.length - 1].toLowerCase()// 提取路由path
                const aPath = {
                    id: v.id,
                    path: path,
                    title: v.title,
                }
                allRoute.push(aPath)// 这里做存放数据格式的操作
            } else if (v.childList && v.childList != null) { // 这里做是否还有子数据的判断
                FlatMenuCalc(v.childList)
            }
        })
    }
}

const concatRoute = (arr: allRouteProps[]) => {
    var NANOID: string[] = []
    const NANOID_ = window.localStorage.getItem('NANOID')

    // 热更新时 nanoid() 会全部更新，而Tab栏选择的的项的key还是之前的
    // 所以需要存一组不会随热更新而改变的值
    if (NANOID_) {
        const NANOID_Arr = JSON.parse(NANOID_)
        if (NANOID_Arr.length == arr.length) {// 通常从本地取
            NANOID = NANOID_Arr
        } else {// 判断id集合需要变更，更新id集合，并手动刷新页面
            const idArr: string[] = []
            arr.forEach(n => idArr.push(nanoid()))
            NANOID = idArr
            window.localStorage.setItem('NANOID', JSON.stringify(NANOID))
            window.location.reload()
            console.log('NANOID 更新')
        }
    } else {// 第一次运行项目
        const idArr: string[] = []
        arr.forEach(n => idArr.push(nanoid()))
        NANOID = idArr
        window.localStorage.setItem('NANOID', JSON.stringify(NANOID))
    }

    arr.forEach((v, index) => {
        const aPath = {
            id: NANOID[index],
            path: v.path,
            title: v.title,
        }
        allRoute.push(aPath)
    })
}

// 首页
let firstPath: string = ''

// route整体路由
let routes: RouteProps[] = basisRoutes

// 接口 获取路由数据(每次刷新页面执行一次)
const getRoute = () => {
    return new Promise<void>((resolve, reject) => {
        const token = getCookie('token')
        if (!token) return// 如果token不存在(未登录)
        let res: MenuType[] = []
        if (token == 'admin12345') {
            res = fakeRouteOne
        } else if (token == '1234512345') {
            res = fakeRouteTwo
        }
        setTimeout(() => {
            updateRoute(res)
            resolve()
        }, 0)
    })
}

/**
 * 逻辑：
 * 未登录时，等待接口请求数据完成再进行跳转
 * 已是登录状态的，刷新页面先使用上次存储在本地的路由数据，待数据请求成功再更新路由
 */
const updateRoute = (newRoute?: MenuType[]) => {
    
    if (newRoute && newRoute.length > 0) {
        window.localStorage.setItem('ROUTE', toCode(JSON.stringify(newRoute)))
        menu = newRoute
    } else {// 如果不是从接口获取的路由数据就先从本地取
        const oldRoute = window.localStorage.getItem('ROUTE')
        if (oldRoute) {
            const newRoute_ = JSON.parse(fromCode(oldRoute))
            menu = newRoute_ ? newRoute_ : []
        } 
    }

    if (menu.length == 0) return// 确切含有路由数据 才往下执行

    menuRoutes = []
    menuCalc(menu)// 动态导入 菜单项 路由

    allRoute = []
    FlatMenuCalc(menu)// 扁平化 菜单项 路由

    concatRoute(pageRoutes)// 扁平、整合页面全部路由

    firstPath = menuRoutes[0].path || ''

    // 组装 路由数据
    routes = [
        {
            path: '/blankview/:id/:name',// 举例用 页面
            element: <BlankView />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/404',
            element: <NotFound />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />
        },
        {
            path: '',
            element: <Main />,
            children: [
                {
                    path: '',
                    element: <Navigate to={firstPath} replace />
                },
                ...menuRoutes, 
                ...pageRoutes,
            ]
        }
    ]
}

getRoute()// 获取路由数据并更新路由(未登录时不会执行)

updateRoute()// 处理路由数据并更新路由

// 路由重置
const resetRoute = () => {
    routes = basisRoutes
}

export {routes, menu, allRoute, firstPath, resetRoute, getRoute}

// console.log('route整体路由', routes);
// console.log('菜单项结构数据', menu);
// console.log('菜单项扁平路由', menuRoutes);
// console.log('全部路由(扁平数组)', allRoute);
