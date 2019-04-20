/* globals document */
import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
// import styled from '@emotion/styled'
// import { css } from '@emotion/core'

const Item = ({ item }) =>
  !item.title ? null : (
    <li>
      <Link to={document.location.pathname + item.url}>{item.title}</Link>
    </li>
  )
Item.propTypes = {
  item: PropTypes.object,
}

const renderItems = items =>
  items?.length && (
    <ul>
      {items.map(x => (
        <React.Fragment key={x.url || x.items[0].url + x.items[0].url}>
          {x.url && <Item item={x} />}
          {x.items?.length && renderItems(x.items)}
        </React.Fragment>
      ))}
    </ul>
  )

const TOC = ({ items }) =>
  !items.length ? null : (
    <div id="toc">
      {console.log(items)}
      {renderItems(items)}
    </div>
  )

TOC.propTypes = {
  items: PropTypes.array,
}
TOC.defaultProps = {
  items: [],
}

export default TOC
export const TableOfContents = TOC
