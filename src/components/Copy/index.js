import React from 'react'
import styled from 'styled-components'
import { useCopyClipboard } from '../../hooks'
// import { CheckCircle, Copy } from 'react-feather'
import { StyledIcon } from '..'
import { CopyTextIcon } from '../../svg'

const CopyIcon = styled.div`
  color: #aeaeae;
  flex-shrink: 0;
  margin-right: 1rem;
  margin-left: 0.5rem;
  text-decoration: none;

  * {
    transition: stroke 200ms ease-in-out;
  }

  :hover,
  :active,
  :focus {
    text-decoration: none;
    cursor: pointer;

    * {
      stroke: #009ce1;
    }
  }
`
// const TransactionStatusText = styled.span`
//   margin-left: 0.25rem;
//   ${({ theme }) => theme.flexRowNoWrap};
//   align-items: center;
//   color: black;
// `

export default function CopyHelper({ toCopy }) {
  //eslint-disable-next-line
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <CopyIcon onClick={() => setCopied(toCopy)}>
      {/*{isCopied ? (*/}
      {/*  <TransactionStatusText>*/}
      {/*    <StyledIcon>*/}
      {/*      <CheckCircle size={'14'} />*/}
      {/*    </StyledIcon>*/}
      {/*  </TransactionStatusText>*/}
      {/*) : (*/}
      {/*  <TransactionStatusText>*/}
      {/*    <StyledIcon>*/}
      {/*     <CopyTextIcon />*/}
      {/*    </StyledIcon>*/}
      {/*  </TransactionStatusText>*/}
      {/*)}*/}
      <StyledIcon>
        <CopyTextIcon />
      </StyledIcon>
    </CopyIcon>
  )
}
