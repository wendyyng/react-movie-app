import React from 'react'
import { HeaderContainer } from './header.styles'

const Header = () => {
  return (
    <HeaderContainer onClick={() => window.scroll(0, 0)}>React Movie TV App</HeaderContainer>
  )
}

export default Header