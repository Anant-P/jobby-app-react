import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJob = props => {
  const {similarJobDetails} = props
  const {
    similarJobcompanyLogoUrl,
    similarJobemploymentType,
    similarJobjobDescription,
    similarJoblocation,
    similarJobrating,
    similarJobtitle,
  } = similarJobDetails
  return (
    <li className="similar-job-card">
      <div>
        <div className="logo-title-container">
          <img
            className="similar-componey-logo-img"
            src={similarJobcompanyLogoUrl}
            alt="similar job company logo"
          />
          <div className="job-title-rating-container">
            <h1 className="similar-job-title">{similarJobtitle}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p>{similarJobrating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-job-title">Description</h1>
        <p className="similar-description-para">{similarJobjobDescription}</p>
      </div>

      <div className="location-type-container">
        <p>
          <MdLocationOn className="location-icon" /> {similarJoblocation}
        </p>
        <p>
          <FaBriefcase className="type-icon" />
          {similarJobemploymentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJob
