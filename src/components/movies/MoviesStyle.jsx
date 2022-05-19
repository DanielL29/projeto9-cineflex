import styled from 'styled-components'

export const MoviesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Available = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    width: 100%;
`

export const CardContainer = styled.div`
    width: 145px;
    height: 209px;
    background-color: #fff;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 8px;
    margin: 0 12px;
    margin-bottom: 11px;
    cursor: pointer;
    transition: all 200ms ease-in-out;

    &:hover {
        transform: scale(110%);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`