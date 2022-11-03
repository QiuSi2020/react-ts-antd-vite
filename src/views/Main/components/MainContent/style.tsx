import styled, {variables, custom_scrollbar} from '@/assets/style'

const unitPx = variables.TabAndContent_px

const padding_ = '10px'// 内容框内边距

export const Div = styled.div.attrs({className: 'MainContentCss'})`

    .content_ {

        /* 此内的div最大宽度一般为： */
        /* div {width: calc(100%);} */

        // 100vh - 顶部栏高度 - navbar高度 - 父元素的 padding-bottom
        min-height: calc(100vh - 64px - calc(40px + 2*${unitPx}) - ${unitPx});
        padding: ${padding_};
        background-color: white;
        /* background-color: #c6e0e5; */

        .loading_ {
            height: calc(100vh - 64px - calc(40px + 2*${unitPx}) - ${unitPx} - ${padding_}*2);
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    // 限制内容高度，并设置滚动条样式

    // 100vh - 顶部栏高度 - navbar高度
    height: calc(100vh - 64px - calc(40px + 2*${unitPx}));
    padding: ${unitPx};
    padding-top: 0;

    // 自定义滚动条
    ${custom_scrollbar}

`
