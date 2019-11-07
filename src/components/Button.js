import styled, { css } from 'styled-components'

export default styled.button`
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  ${p => p.primary && css`
    background-color: #2D7AEE;
    color: #fff;
  `}
  ${p => p.disabled && css`
    opacity: .5; 
    cursor: not-allowed;
  `}
`
