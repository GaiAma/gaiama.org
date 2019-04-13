import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import TextareaAutosize from 'react-textarea-autosize'
import { colors, fontFamilies } from '@src/theme'

const Input = ({ label, value, type, placeholder, onInput, ...props }) => (
  <div
    css={css`
      margin-bottom: 0.8rem;
    `}
  >
    <label>
      {label && (
        <span
          css={css`
            font-family: ${fontFamilies.accent};
            font-size: 1.5rem;
            display: block;
          `}
        >
          {label}
        </span>
      )}

      {type === `textarea` ? (
        <TextareaAutosize
          value={value}
          onInput={e => onInput(e)}
          maxRows={10}
          placeholder={placeholder}
          css={css`
            ${styles.input};
            min-height: 8rem;
          `}
          {...props}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onInput={e => onInput(e)}
          css={styles.input}
          {...props}
        />
      )}
    </label>
  </div>
)

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onInput: PropTypes.func,
}
Input.defaultProps = {
  label: ``,
  value: ``,
  type: `text`,
  placeholder: ``,
  onInput: () => {},
}

const styles = {
  input: {
    width: `100%`,
    border: `1px solid ${colors.gray3}`,
    background: colors.white,
    lineHeight: 1.5,
    padding: `0 .5rem`,
  },
}

export default Input

export const Email = props => <Input type="email" {...props} />
export const Textarea = props => <Input type="textarea" {...props} />
