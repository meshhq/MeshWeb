
import React, { PropTypes } from 'react'
import avatar from '../../../../../assets/images/default-avatar-1.png'

const ProfileHeroWidget = ({ imgURL, name, title, extraInfo }) => {

  // Set pic to URL if available
  let picSrc = imgURL ? imgURL : avatar

  return (
    <div className="profile-widget row row-eq-height">
      <div className="col-xs-4 profile-pic flex-center">
        <img className="img-responsive img-circle avatar" src={picSrc} />
      </div>
      <div className="col-xs-8 profile-info flex-col-vcenter">
        <p className="profileName">{name}</p>
        <p className="profileTitle">{title}</p>
        <p className="profileInfo">{extraInfo}</p>
      </div>
    </div>
  )
}

// Default Props
ProfileHeroWidget.propTypes = {
  extraInfo: PropTypes.string,
  imgURL: PropTypes.string,
  name: PropTypes.string.isRequired,
  title: PropTypes.string
}

// Display Name
ProfileHeroWidget.displayName = 'Profile Widget'

export default ProfileHeroWidget
