import React from 'react'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'
import { fontFamilies } from '@/theme'

const Input = ({
  label,
  value,
  type,
  placeholder,
  onInput,
  ...props
}) => (
  <div css={{ marginBottom: `.8rem` }}>
    <label>
      {label &&
        <span css={{
          fontFamily: fontFamilies.accent,
          fontSize: `1.5rem`,
          display: `block`,
        }}>
          {label}
        </span>
      }

      {
        type === `textarea`
          ? (
            <TextareaAutosize
              value={value}
              onInput={e => onInput(e)}
              maxRows={10}
              placeholder={placeholder}
              css={{
                ...styles.input,
                minHeight: `8rem`,
              }}
              {...props}
            />
            )
          : (
            <input
              type={type}
              value={value}
              placeholder={placeholder}
              onInput={e => onInput(e)}
              css={styles.input}
              {...props}
            />
          )
      }
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
    border: `1px solid #ccc`,
    background: `#fff`,
    lineHeight: 1.5,
    padding: `0 .5rem`,
  },
}

export default Input

export const Email = props => <Input type="email" {...props} />
export const Textarea = props => <Input type="textarea" {...props} />
