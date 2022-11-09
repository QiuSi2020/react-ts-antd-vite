import styled from 'styled-components'

import * as variables from './variables'// 导入公共样式变量

export default styled

export {variables}

/*公共样式-公共样式-公共样式*/

// flex-direction: column;// 使弹性盒模型垂直排列

// 垂直居中 盒模型
export const centerBox = `
    display: flex;
    justify-content: center;
    align-items: center;
`

// 自定义滚动条
export const custom_scrollbar = `
    overflow-x: hidden;
    overflow-y: auto;

    // 滚动条 样式(谷歌)
    ::-webkit-scrollbar {
        // 滚动条整体样式
        width: 6px;// 高宽分别对应横竖滚动条的尺寸
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        // 滚动条里面小方块
        border-radius: 10px;
        background-color: #afafaf;
    }
    ::-webkit-scrollbar-track {
        // 滚动条里面轨道
        border-radius: 10px;
        background-color: transparent;
    }

    // 滚动条 样式(火狐)
    scrollbar-width: thin;
    scrollbar-color:#afafaf transparent;
`

export const hidden_scrollbar = `
    overflow-x: hidden;
    overflow-y: auto;

    // 隐藏 滚动条
    ::-webkit-scrollbar { display: none; }// 谷歌浏览器
    scrollbar-width: none;// 火狐浏览器
`
