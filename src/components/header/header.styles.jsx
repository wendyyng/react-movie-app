import styled from 'styled-components'

export const HeaderContainer = styled.span`
    @import url('http://fonts.cdnfonts.com/css/arcade-classic');
    width: 100%;
    cursor: pointer;
    // position: fixed;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    background-color: black;
    font-family: 'ArcadeClassic', sans-serif;
    font-size: 5vw;
    padding-bottom: 15px;
    box-shadow: 0px 1px 5px black;
    color: white;
    z-index: 100;
}

@media (max-width: 1000px) {
    padding-top: 15px;
    font-size: 6.4vw;
`