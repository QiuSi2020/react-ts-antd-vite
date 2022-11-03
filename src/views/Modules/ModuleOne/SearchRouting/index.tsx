import {useState, useEffect} from "react"

import {useLocation, useSearchParams} from 'react-router-dom'

import KeepAlive from '@/components/KeepAlive'

import qs from 'qs'// 处理search方式传参(qs.parse()、qs.stringify())

interface MyObject {
    [key: string]: any
}

function PageName() {

    useEffect(() => {
        console.log('pathname', pathname)
        console.log('search', search)
        console.log('searchData', searchData)
    }, [])

    const {pathname} = useLocation()
    
    // 取参方式一
    const {search} = useLocation()
    const [searchData, setSearchData] = useState<MyObject>(qs.parse(search.slice(1)))

    // 取参方式二
    // const [Search, setSearch] = useSearchParams()
    // console.log('search', Search.get('id'))// 获取对应参数
    // console.log('search', Search.get('name'))// 获取对应参数

    return (
        <>
            <h1>search 方式传1参</h1>
            <h2>接收到的值：</h2>
            <h3>ID: {searchData.id}</h3>
            <h3>名称: {searchData.name}</h3>
        </>
    )
}

export default () => KeepAlive(<PageName />)
