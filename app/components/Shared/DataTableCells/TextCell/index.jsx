
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  let object = data.getObjectAt(rowIndex)
  let onClick = props.onClick.bind(this, rowIndex)
  const text = object[col]

  // Render a appropriate blank state
  let content
  if (!text || !text.length) {
    const deSnaked = col.replace('_', ' ')
    content = (
      <p className="blank-content">{'Unknown ' + deSnaked}</p>
    )
  } else {
    content = (
      <p>{text}</p>
    )
  }

  return (
    <div className="text-cell">
      <Cell {...props} onClick={onClick}>
        {content}
      </Cell>
    </div>
    )
}

TextCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

TextCell.displayName = 'Text Cell'

export default TextCell
