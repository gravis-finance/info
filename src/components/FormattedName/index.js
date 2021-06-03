import React, { useState } from 'react'
import styled from 'styled-components'
import { Tooltip } from '../QuestionHelper'
// import { useTranslation } from 'react-multi-lang'

const TextWrapper = styled.div`
  position: relative;
  margin-left: ${({ margin }) => margin && '4px'};
  color: ${({ theme, link }) => (link ? theme.blue : theme.text1)};
  font-size: ${({ fontSize }) => fontSize ?? 'inherit'};
  transition: color 200ms ease-in-out;

  :hover {
    color: white;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    font-size: ${({ adjustSize }) => adjustSize && '12px'};
  }
`

const FormattedName = ({ text, maxCharacters, margin = false, adjustSize = false, fontSize, link, ...rest }) => {
  const [showHover, setShowHover] = useState(false)

  // const { t } = useTranslation()

  if (!text) {
    return ''
  }

  // const filterText = (text) => {
  //   // return text
  //   if(text.includes('Token'))
  //     return `${text.slice(0, text.indexOf('Token'))} suka ${text.slice(text.indexOf('Token')+5)}`
  // }

  if (text.length > maxCharacters) {
    return (
      <Tooltip text={text} show={showHover}>
        <TextWrapper
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
          margin={margin}
          adjustSize={adjustSize}
          link={link}
          fontSize={fontSize}
          {...rest}
        >
          {' ' + text.slice(0, maxCharacters - 1) + '...'}
        </TextWrapper>
      </Tooltip>
    )
  }

  return (
    <TextWrapper margin={margin} adjustSize={adjustSize} link={link} fontSize={fontSize} {...rest}>
      {text}
    </TextWrapper>
  )
}

export default FormattedName
