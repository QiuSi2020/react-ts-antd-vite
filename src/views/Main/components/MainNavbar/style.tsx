import styled, {variables} from '@/assets/style'

const unitPx = variables.TabAndContent_px

const themeColor = variables.themeColor

// Navbar卡片样式
export const Navbar = styled.div.attrs({className: 'NavbarCss'})`

    &>.ant-tabs>.ant-tabs-nav {
        
        /* margin: ${unitPx}; */
        margin: 0;
        padding: ${unitPx};

        &>.ant-tabs-nav-wrap>.ant-tabs-nav-list {
            div {
                margin-right: 0 !important;
                
                /* Tab样式 */
                .ant-tabs-tab {
                    // 一个 Tab+顶部外边距 通常为40px

                    width: 120px;
                    display: flex;
                    justify-content: space-between;

                    /* Tab内标题超出隐藏 */
                    &>.ant-tabs-tab-btn {
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    /* Tab删除按钮 */
                    &>.ant-tabs-tab-remove {
                        margin: 0;
                    }

                    /* margin-right: ${unitPx} !important; */
                }

                .ant-tabs-tab:hover {
                    min-width: 100%;
                }

                /* 选中样式 */
                .ant-tabs-tab-active {
                    width: 135px !important;
                    border: 1px solid ${themeColor};
                    border-radius: 7px;
                    box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
                    /* 选中字体颜色 */
                    &>.ant-tabs-tab-btn {
                        color: ${themeColor};
                    }
                }
                
            }
        }
    }
`
