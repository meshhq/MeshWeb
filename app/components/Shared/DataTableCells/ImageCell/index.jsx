
import React, { PropTypes } from 'react'
import ExampleImage from '../../../helpers/examplePicture'

const ImageCell = ({ rowIndex, data, col }) => {
  return (  
    <ExampleImage
      src={data.getObjectAt(rowIndex)[col]}
    /> 
  )
}

ImageCell.propTypes = {
	col: PropTypes.number.isRequired,
	data: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired
}

ImageCell.displayName = 'Profile Image Cell'

export default ImageCell