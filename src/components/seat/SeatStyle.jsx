import styled from 'styled-components'

function statusColor(status, color, background = false, green, yellow) {
    if(status === undefined || color === undefined) {
        if(background) {
            if(green) return '#8DD7CF'
            else if(yellow) return '#FBE192'
            else return '#C3CFD9'
        }
        else {
            if(green) return '#1AAE9E'
            else if(yellow) return '#F7C52B'
            else return '#808F9D'
        }
    } else {
        if(background) return !status ? '#FBE192' : color ? '#8DD7CF' : '#C3CFD9'
        else return !status ? '#F7C52B' : color ? '#1AAE9E' : '#808F9D'
    }
}

export const SeatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26px;
    height: 26px;
    background-color: ${({ status, color, green, yellow }) => statusColor(status, color, true, green, yellow)};
    border: 1px solid ${({ status, color, green, yellow }) => statusColor(status, color, false, green, yellow)};
    border-radius: 100%;
    font-size: 11px;
    color: #000;
    margin-bottom: 18px;
    margin-right: 7px;
    cursor: pointer;

    @media screen and (max-width: 400px) {
        .seat {
            margin-right: 5px;
        }
    }
`