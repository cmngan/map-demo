// import React from 'react'
import styled, { css } from 'styled-components'
const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  ${p => p.flexWrap && css`flex-wrap: wrap`}
  ${p => p.flex && css`flex: ${p.flex}`};
  ${p => p.width && css`width: ${p.width}`};
  ${p => p.height && css`height: ${p.height}`};
  ${p => p.padding && css`padding: ${p.padding}`};
  ${p => p.margin && css`margin: ${p.margin}`};
  ${p => p.bgColor && css`background-color: ${p.bgColor}`};
`

const Row = styled(Flex)`
  ${p => p.left && css`justify-content: flex-start`};
  ${p => p.right && css`justify-content: flex-end`};
  ${p => p.center && css`justify-content: center`};
  ${p => p.centerVertical && css`align-items: center`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  ${p => p.top && css`align-items: flex-start`};
  ${p => p.bottom && css`align-items: flex-end`};
  `
  
const Col = styled(Flex)`
  flex-direction: column;
  ${p => p.left && css`align-items: flex-start`};
  ${p => p.right && css`align-items: flex-end`};
  ${p => p.center && css`align-items: center`};
  ${p => p.centerVertical && css`justify-content: center`};
  ${p => p.bottom && css`justify-content: flex-end`};
  ${p => p.spaceBetween && css`justify-content: space-between`};
  ${p => p.spaceAround && css`justify-content: space-around`};
  `

export {
  Row, Col, Flex
}