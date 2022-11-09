import styled, {centerBox, custom_scrollbar} from '@/assets/style'

const height = '64px'// 最高 高度

export const Div = styled.div.attrs({className: 'MainHeaderCss'})`
    width: ${height};
    height: ${height};

    ${centerBox}

    /* 头像字符大小 */
    .head_ {
        font-size: 12px;
    }
`

// 限制高度，超出出现自定义滚动条
export const CardBox = styled.div`

    max-height: 80vh;// 最大高度
    
    overflow-x: hidden;
    overflow-y: auto;
    ${custom_scrollbar}
`
