import styled from 'styled-components'

export const SuccessContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    div:nth-child(2) {
        width: 375px;
    }

    .home {
        width: 225px;
        height: 42px;
        color: #fff;
        font-weight: 400;
        margin-top: 50px;
        margin-bottom: 30px;
    }

    @media screen and (max-width: 500px) {
        div:nth-child(2) {
            width: 90%;
        }
    }
`

export const Info = styled.div`
    color: #293845;
    font-size: 22px;
    margin-bottom: 40px;

    div {
        margin-bottom: 30px;
    }

    strong {
        display: inline-block;
        font-weight: bold;
        color: #293845;
        font-size: 24px;
        margin-bottom: 10px;
    }

    p {
        margin-bottom: 5px;
    }
`