import styled from 'styled-components'

export const SeatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 150px;

    button {
        width: 225px;
        height: 42px;
    }
`

export const SeatsSection = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 350px;

    img {
        margin-left: 70px;
    }

    @media screen and (max-width: 400px) {
        width: 95%;
    }
`

export const Status = styled.div`
    display: flex;
    justify-content: space-between;
    width: 225px;
    margin-bottom: 50px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
        color: #4E5A65;
    }

    div > div {
        margin: 0;
        margin-bottom: 10px;
    }
`

export const UserForm = styled.div`
    font-size: 18px;
    color: #293845;
    margin-bottom: 40px;

    h1 {
        font-weight: bold;
        margin-bottom: 10px;
    }

    p {
        color: red;
    }

    div, div > div {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    }

    input {
        width: 327px;
        height: 51px;
        background-color: #fff;
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        font-style: italic;
        color: #AFAFAF;
        margin-top: 5px;
        padding-left: 18px;
        font-size: 18px;
        outline: none;
    }

    input:focus {
        font-style: normal;
    }

    input::placeholder {
        color: #AFAFAF;
    }

    @media screen and (max-width: 400px) {
        input {
            width: 100%;
        }
    }
`