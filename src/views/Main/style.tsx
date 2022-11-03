import styled, {hidden_scrollbar} from '@/assets/style'

import Logo from '@/assets/img/Logo.jpg'

// 左上角框
export const TopLeftBox = styled.div.attrs({className: 'TopLeftBox'})`
    --height: 32px;
    --borderRadius: 5px;

    // 展示方式一
    height: var(--height);
    margin: 16px;
    border-radius: var(--borderRadius);
    white-space: nowrap;
    overflow: hidden;

    .TopLeftBoxContent {
        height: var(--height);
        background: rgba(255, 255, 255, 1);
        border-radius: var(--borderRadius);
        padding: 0 5px;

        // 展示方式二(注释其他三个 展示方式一)
        /* margin: 16px;
        display: flex; */

        display: inline-flex;// 展示方式一

        .title_ {
            padding: 0 5px;// 展示方式一
            flex: 1;
            font-size: 20px;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
        }

        .logo_ {
            width: var(--height);
            height: var(--height);
            margin: 0 3px;
            display: flex;
            justify-content: center;
            align-items: center;

            /* logo */
            .logo_img {
                width: 25px;
                height: 25px;
                background: url(${Logo}) no-repeat center 0;
                background-size: contain;
            }
        }
    }
`

// 左侧菜单栏相关
export const MenuBox = styled.div`

    --height: 64px;

    // 100vh - logo栏高度 - mainContent 底部收缩按钮高度
    height: calc(100vh - var(--height) - 48px);
    
    // 隐藏 滚动条
    ${hidden_scrollbar}

    /* overflow-x: hidden;
    overflow-y: scroll;
    // 滚动条 样式
    ::-webkit-scrollbar {
        // 滚动条整体样式
        width: 6px;// 高宽分别对应横竖滚动条的尺寸
        height: 6px;
    }
    ::-webkit-scrollbar-thumb {
        // 滚动条里面小方块
        border-radius: 10px;
        background-color: rgb(24, 144, 255);
    }
    ::-webkit-scrollbar-track {
        // 滚动条里面轨道
        border-radius: 10px;
        background-color: transparent;
    } */
`

// 顶部栏相关
export const HeaderBox = styled.div`
    display: flex;
`
