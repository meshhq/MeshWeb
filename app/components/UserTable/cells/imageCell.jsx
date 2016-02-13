
import React from 'react'
import ExampleImage from '../../helpers/examplePicture'

const ImageCell = ({ rowIndex, data, col }) => {
  return (  
      <ExampleImage
        src={data.getObjectAt(rowIndex)[col]}
      /> 
  )
}

ImageCell.displayName = 'Profile Image Cell'

export default ImageCell