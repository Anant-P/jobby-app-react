import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class UserProfile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount = () => {
    this.setState(
      {apiStatus: apiStatusConstant.pending},
      this.getUserProfileDetails,
    )
  }

  profileApiResponseSuccess = data => {
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({
      profileDetails: updatedData,
      apiStatus: apiStatusConstant.success,
    })
  }

  apiResponseFailure = () => {
    this.setState({apiStatus: apiStatusConstant.fail})
  }

  getUserProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const userProfileApi = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(userProfileApi, options)
    const data = await response.json()

    if (response.ok === true) {
      this.profileApiResponseSuccess(data)
    } else {
      this.apiResponseFailure()
    }
  }

  // reloading result

  profileReloadPage = () => {
    this.setState(
      {apiStatus: apiStatusConstant.pending},
      this.getUserProfileDetails,
    )
  }

  // loader

  renderLoader = () => (
    <div className="user-profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // failure view jsx

  renderPorfileFailureView = () => (
    <div className="job-fail-container">
      <button
        className="retry-btn"
        type="button"
        onClick={this.profileReloadPage}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {profileDetails, apiStatus} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    const renderProfileSucessView = () => (
      <div className="profile-container">
        <img className="profile-img" src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )

    const profileRenderPage = () => {
      switch (apiStatus) {
        case apiStatusConstant.pending:
          return this.renderLoader()
        case apiStatusConstant.success:
          return renderProfileSucessView()
        case apiStatusConstant.fail:
          return this.renderPorfileFailureView()
        default:
          return null
      }
    }

    return profileRenderPage()
  }
}

export default UserProfile
