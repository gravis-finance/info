import React from 'react'
import { Link as RebassLink } from 'rebass'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

const WrappedLink = ({ external, children, ...rest }) => (
  <RebassLink
    target={external ? '_blank' : null}
    rel={external ? 'noopener noreferrer' : null}
    color="#2f80ed"
    {...rest}
  >
    {children}
  </RebassLink>
)

WrappedLink.propTypes = {
  external: PropTypes.bool,
}

const Link = styled(WrappedLink)`
  color: ${({ color, theme }) => (color ? color : theme.link)};
  div {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  transition: width 200ms ease-in-out, margin 200ms ease-in-out, color 200ms ease-in-out;

  :hover {
    color: white;
  }

  ${({ isPushed }) =>
    isPushed
      ? `
      margin-left: 6px !important;
      width: 44px;
      > div {
        padding-left: 9.4px;
      }
    `
      : ''}
`

export default Link

export const CustomLink = styled(RouterLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  color: ${({ color, theme }) => (color ? color : theme.link)};

  &:visited {
    color: ${({ color, theme }) => (color ? lighten(0.1, color) : lighten(0.1, theme.link))};
  }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
    color: ${({ color, theme }) => (color ? darken(0.1, color) : darken(0.1, theme.link))};
  }
`

export const ButtonLink = styled(RouterLink)`
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  padding: 6px 16px;
  color: white; // ${({ color, theme }) => (color ? color : theme.link)};
  border: 1px solid #009ce1;
  transition: background-color, color 200ms ease-in-out;

  background: linear-gradient(90.28deg, #292929 0%, #242424 100%);
  border: 1px solid #2e2e2e;
  box-sizing: border-box;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  border-radius: 38px;

  // &:visited {
  //   color: ${({ color, theme }) => (color ? lighten(0.1, color) : lighten(0.1, theme.link))};
  // }

  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
    background-color: #8677f0;
    color: #fff;
    background: linear-gradient(90.28deg, #242424 0%, #202020 100%);
    border: 1px solid #2e2e2e;
    box-sizing: border-box;
    box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.4), -4px -4px 12px rgba(255, 255, 255, 0.05);
  }

  &:active {
    background-color: #009ce1;
    box-shadow: inset 0px 3px 0px #5b4dbc;
    background: linear-gradient(90.28deg, #242424 0%, #1f1f1f 100%), linear-gradient(90.28deg, #242424 0%, #202020 100%);
    border: 1px solid transparent;
    box-sizing: border-box;
    box-shadow: inset 0px -1px 0px rgba(129, 129, 129, 0.15), inset 0px 4px 25px rgba(0, 0, 0, 0.25);
  }
`

export const BasicLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  > div {
    display: flex;
    align-items: center;
    padding-left: 16px;
    transition: padding 200ms ease-in-out, width 200ms ease-in-out;
  }
  &:hover {
    cursor: pointer;
    text-decoration: none;
    underline: none;
  }
  height: 52px;

  transition: width 200ms ease-in-out, margin 200ms ease-in-out;

  ${({ isPushed }) =>
    isPushed
      ? `
      margin-left: 6px;
      width: 44px;
      > div {
        padding-left: 9.4px;
      }
    `
      : ''}
`
