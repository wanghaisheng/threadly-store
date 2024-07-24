import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const sizes = {
  small: "24px",
  medium: "28px",
  large: "40px",
}

const types = {
  primary: css`
    background-color: #2979ff;
    color: white;
    --s1-keyline: #2979ff;

    &:hover:not(:active) {
      --s1-keyline: #1c54b2;
      border-color: #2979ff;
    }

    &:active {
      border-color: #1c54b2;
      background-color: #1367f6;
      color: #d0daff;
      --s1-keyline: #1c54b2;
      --s1-top-shadow: 0px -1px 1px 0px rgba(16, 17, 26, 0.16);
    }
  `,
  secondary: css`
    background-color: #ffffff;
    color: #353a44;
    border-color: #d8dee4;

    &:hover:not(:active) {
      --s1-keyline: #99a5b8;
      border-color: #99a5b8;
    }

    &:active {
      border-color: #d8dee4;
      background-color: #f5f6f8;
      color: #474e5a;
      --s1-keyline: #d8dee4;
      --s1-top-shadow: 0px -1px 1px 0px rgba(16, 17, 26, 0.16);
    }
  `,
  destructive: css`
    background-color: #e61947;
    color: white;
    border-color: #e61947;
    --s1-top-shadow: 0px 1px 1px 0px rgba(62, 2, 26, 0.32);
    --s1-keyline: #e61947;

    &:hover:not(:active) {
      --s1-keyline: #9b0c36;
      border-color: #9b0c36;
    }

    &:active {
      border-color: #9b0c36;
      background-color: #c0123c;
      color: #fbd3dc;
      --s1-keyline: #9b0c36;
      --s1-top-shadow: 0px -1px 1px 0px rgba(62, 2, 26, 0.32);
    }
  `,
}

const ButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  padding: var(--s1-padding-top) var(--s1-padding-right)
    var(--s1-padding-bottom) var(--s1-padding-left);
  box-shadow: var(--s1-top-shadow),
    var(--s1-keyline) 0 0 0 var(--s1-keyline-width), var(--s1-focus-ring),
    var(--s1-box-shadow);
  min-height: 28px;
  transition-property: background-color, box-shadow;
  transition-timing-function: cubic-bezier(0, 0.09, 0.4, 1);
  transition-duration: 150ms;
  height: ${(props) => sizes[props.size || "medium"]};
  font-size: ${(props) =>
    props.size === "small" ? "12px" : props.size === "large" ? "16px" : "14px"};
  border-radius: 6px;
  --s1-focus-ring: 0 0 0 0 transparent;
  outline: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  ${(props) => props.type && types[props.type]};
  ${(props) => props.disabled && "pointer-events: none;"};
  ${(props) =>
    props.href &&
    css`
      text-decoration: none;
      display: inline-block;
    `}

  &:hover {
    transition-duration: 0ms;
  }

  &:focus {
    --s1-focus-ring: 0 0 0 4px rgba(1, 150, 237, 0.36);
    outline: 1px solid transparent;
  }
`

/**
 * Button component for triggering actions or navigating to links.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.href] - The URL the button should link to. If provided, the button renders as an <a> tag.
 * @param {function} [props.onPress] - The handler for the button's onClick event.
 * @param {'small'|'medium'|'large'} [props.size='medium'] - The size of the button.
 * @param {'_self'|'_blank'|'_top'|'_parent'} [props.target='_self'] - The target for the link if href is provided.
 * @param {'primary'|'secondary'|'destructive'} [props.type='secondary'] - The type of the button, affecting its styling.
 */
const Button = ({ children, disabled, href, onPress, size, target, type }) => {
  if (href) {
    return (
      <ButtonWrapper
        as="a"
        href={href}
        target={target}
        size={size}
        type={type}
        disabled={disabled}
        onClick={(e) => {
          if (disabled) {
            e.preventDefault()
          } else if (onPress) {
            onPress(e)
          }
        }}
      >
        {children}
      </ButtonWrapper>
    )
  }

  return (
    <ButtonWrapper
      size={size}
      type={type}
      disabled={disabled}
      onClick={(e) => {
        if (!disabled && onPress) {
          onPress(e)
        }
      }}
    >
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  target: PropTypes.oneOf(["_self", "_blank", "_top", "_parent"]),
  type: PropTypes.oneOf(["primary", "secondary", "destructive"]),
}

Button.defaultProps = {
  disabled: false,
  href: undefined,
  onPress: undefined,
  size: "medium",
  target: "_self",
  type: "secondary",
}

export default Button
