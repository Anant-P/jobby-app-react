import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobListItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="job-nav-link" to={`/jobs/${id}`}>
      <li className="job-item-card">
        <div className="logo-title-container">
          <img
            className="componey-logo-img"
            src={companyLogoUrl}
            alt="company logo url"
          />
          <div className="job-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p> {rating}</p>
            </div>
          </div>
        </div>
        <div className="location-type-salary-container">
          <div className="location-type-container">
            <p>
              <MdLocationOn className="location-icon" /> {location}
            </p>
            <p>
              <FaBriefcase className="type-icon" />
              {employmentType}
            </p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="job-item-card-line" />
        <h2 className="description-heading">Description</h2>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobListItem
