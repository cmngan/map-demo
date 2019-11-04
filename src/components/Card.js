import styled, { css } from 'styled-components'
import { Col } from './Layout'

export default styled(Col)`
  margin: 4px 8px;
  padding: 12px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  transition: 0.3s;
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.1);
  }
  ${p => p.selected && css`background-color: SkyBlue` }
  ${p => p.onClick && css`cursor: pointer;`}
`
