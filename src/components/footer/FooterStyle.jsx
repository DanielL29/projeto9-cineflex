import styled from 'styled-components'

export const FooterContainer = styled.div`
    display: flex;
    align-items: center;

    position: fixed;
    width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    font-size: 26px;
    color: #293845;

    .footer-card {
        width: 64px;
        height: 89px;
        background-color: #fff;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        padding: 8px;
        box-sizing: border-box;
        margin-left: 10px;
        margin-right: 14px;
    }

    .footer-card img {
        width: 100%;
        object-fit: cover;
    }
`