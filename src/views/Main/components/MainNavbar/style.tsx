import styled, {variables} from '@/assets/style'

const unitPx = variables.TabAndContent_px

// Navbar卡片样式
export const Navbar = styled.div.attrs({className: 'NavbarCss'})`

    &>.ant-tabs>.ant-tabs-nav {
        margin: 0 ${unitPx};
        margin-bottom: ${unitPx};

        /* 让 额外操作 贴底 */
        display: flex;
        align-items: end;

        &>.ant-tabs-nav-wrap>.ant-tabs-nav-list {
            div {
                margin-right: 0 !important;
                
                /* Tab样式 */
                .ant-tabs-tab {
                    // 一个 Tab+顶部外边距 通常为40px

                    width: 120px;
                    border-radius: 0 10px;
                    display: flex;
                    justify-content: space-between;

                    &>.ant-tabs-tab-btn {
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    // 每一个Tab距离顶部的高度
                    /* --MarginTop: 4px;
                    height: calc(40px - var(--MarginTop, 4px));
                    margin-top: var(--MarginTop, 5px); */
                    
                    margin-top: ${unitPx};
                }
            }
        }
    }
`
