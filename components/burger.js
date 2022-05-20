import styled from 'styled-components'
import { color } from '../color'

const StyledBurger = styled.button`
  position: absolute;
  top: 25%;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.3rem;
    background: ${color.WHITE};
    border-radius: 10px;
  }
`

const Burger = () => {
  return (
    <StyledBurger>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export default Burger
