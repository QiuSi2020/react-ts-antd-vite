import {useState, useEffect} from "react"

import {useLocation, useSearchParams} from 'react-router-dom'

import KeepAlive from '@/components/KeepAlive'

interface MyObject {
    [key: string]: any
}

function PageName() {

    useEffect(() => {
        console.log('pathname', pathname)
        console.log('state', state)
    }, [])

    const {pathname} = useLocation()
    
    const {state}: MyObject = useLocation()

    return (
        <>
            <h1>state 方式传参</h1>
            <h2>接收到的值：</h2>
            <h3>ID: {state.id}</h3>
            <h3>名称: {state.name}</h3>
        </>
    )
}

export default () => KeepAlive(<PageName />)
