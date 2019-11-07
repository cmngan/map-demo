import { css } from 'styled-components'
import { CSS_MOBILE_BREAKPOINT } from '../config'

export const responsiveCss = (key, values) => 
  values ?
    values instanceof Array ? 
      css`
        ${key}: ${values[0]};
        @media only screen and (min-width: ${CSS_MOBILE_BREAKPOINT}px) {
          ${key}: ${values[1]}
        }
      `
    : css`${key}: ${values}`
  : null
