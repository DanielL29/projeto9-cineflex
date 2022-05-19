import styled from 'styled-components'

export const PageTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 120px;
    margin-bottom: 53px;
    font-size: 24px;
    color: ${({ color }) => color ?? '#293845'};
    font-weight: ${({ color }) => color ? 'bold' : 'normal'};
    text-align: center;

    h1 {
        width: 280px;
    }
`