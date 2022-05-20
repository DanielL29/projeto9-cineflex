import styled from 'styled-components'

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    background-color: #C3CFD9;
    width: 100%;
    height: 67px;
    color: #E8833A;
    font-size: 34px;

    button {
        position: absolute;
        left: 0;
        margin-left: 10px;
        padding: 5px;
        top: 25%;
    }

    h1:hover {
        cursor: pointer;
        animation-name: grow;
        animation-duration: 400ms;
        animation-timing-function: linear;
    }

    @keyframes grow {
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`