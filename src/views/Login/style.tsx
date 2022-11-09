import styled from '@/assets/style'

// 报错，但能正常执行
import login_bg from '@/assets/img/linear.jpg'
// import login_bg from '@/assets/img/gril.jpg'

export const LoginDiv = styled.div.attrs({className: 'LoginDiv'})`
    width: 100%;
    height: 100vh;
    background:url(${login_bg}) no-repeat center 0;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .continueMoveBox {
        position: fixed;
        top: 0;
        right: 0;
        width: 10vh;
        height: 10vh;
        display: flex;
        justify-content: end;
        padding: 10px;

        .moveBoxChild {
            width: 5vh;
            height: 5vh;
            border-radius: 10px;
            background-color: #0093E9;
            background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
            position: relative;
            animation: 5s mymove linear infinite;
            -webkit-animation: 5s mymove linear infinite;
        }
    }

    .login_box {
        width: 350px;
        padding: 0 20px;
        border-radius: 10px;
        background-color: #e2e2e2;
        background-repeat: no-repeat;
        background-image: linear-gradient(224deg, #D9AFD9 0%, #97D9E1 100%);
        /* background-image: 
            radial-gradient(closest-side, rgba(217, 175, 217, 1), rgba(151, 217, 225, 1)),
            radial-gradient(closest-side, rgba(0, 147, 233, 1), rgba(128, 208, 199, 1)),
            radial-gradient(closest-side, rgba(133, 255, 189, 1), rgba(255, 251, 125, 1));
        background-size: 
            120vmax 120vmax,
            120vmax 120vmax,
            120vmax 120vmax;
        background-position:
            -50vmax -50vmax,
            0vmax 0vmax,
            50vmax 50vmax;
        animation: 4s movement linear infinite; */

        .login_title{
            font-family: PingFangSC-Medium;
            font-size: 22px;
            text-align: center;
            color: white;
            padding: 20px 0;
        }

        .login_btn {
            width: 100%;
            border-radius: 5px;
        }
    }

    .mark_css {
        position: fixed;
        bottom: 0;
        width: 100vw;
        color: white;
        text-align: center;
        background-color: #2c2c2c;
        font-size: 12px;
        padding: 2px 0;
    }

    @keyframes movement {
        0%, 100% {
            background-position:
                -65vmax -70vmax,
                0vmax 0vmax,
                -50vmax -50vmax;
        }
        25% {
            
            background-position:
                -60vmax -60vmax,
                -30vmax -30vmax,
                -30vmax -30vmax;
        }
        50% {
            
            background-position:
                -40vmax -40vmax,
                -50vmax -50vmax,
                -10vmax -10vmax;
        }
        75% {
            background-position:
                -20vmax -20vmax,
                -70vmax -70vmax,
                -60vmax -60vmax;
        }
    }

    @keyframes mymove {
        0%, 100% {
            top:0; 
            right:0; 
            background: #00DBDE;
            background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
            transform:rotate(0);
        }
        25% {
            top:5vh; 
            right:0; 
            background: #4158D0;
            background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
            transform:rotate(90deg);
        }
        50% {
            top:5vh; 
            right:5vh; 
            background: #FFFFFF;
            background-image: linear-gradient(180deg, #FFFFFF 0%, #6284FF 50%, #FF0000 100%);
            transform:rotate(180deg);
        }
        75% {
            top:0; 
            right:5vh; 
            background: #FA8BFF;
            background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%);
            transform:rotate(270deg);
        }
    }
`