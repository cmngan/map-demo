import styled, { css } from 'styled-components'

export default styled.button`
  border: none;
  padding: 0;
  border-radius: 4px;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
  ${p => p.primary && css`
    padding: 8px 12px;
    background-color: #2D7AEE;
    color: #fff;
  `}
`
