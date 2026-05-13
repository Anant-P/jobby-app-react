import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiExternalLinkFill} from 'react-icons/ri'
import SimilarJob from '../SimilarJob'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skillsList: [],
    similarJobsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.setState({apiStatus: apiStatusConstant.pending}, this.getJobDetails)
  }

  // api success to loading job detail view object

  apiResponseSuccess = data => {
    const formatedJobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
    }
    const formatedLifeAtCompany = {
      lifeAtCompanydescription: data.job_details.life_at_company.description,
      lifeAtCompanyimageUrl: data.job_details.life_at_company.image_url,
    }

    const formatedSkillsList = data.job_details.skills.map(eachItem => ({
      skillsImageUrl: eachItem.image_url,
      skillsName: eachItem.name,
    }))

    const formatedSimilarJobsList = data.similar_jobs.map(eachItem => ({
      similarJobcompanyLogoUrl: eachItem.company_logo_url,
      similarJobemploymentType: eachItem.employment_type,
      similarJobid: eachItem.id,
      similarJobjobDescription: eachItem.job_description,
      similarJoblocation: eachItem.location,
      similarJobrating: eachItem.rating,
      similarJobtitle: eachItem.title,
    }))

    this.setState({
      jobDetails: formatedJobDetails,
      lifeAtCompany: formatedLifeAtCompany,
      skillsList: formatedSkillsList,
      similarJobsList: formatedSimilarJobsList,
      apiStatus: apiStatusConstant.success,
    })
  }

  // api fail to load data

  apiResponseFailure = () => {
    this.setState({apiStatus: apiStatusConstant.fail})
  }

  // calling api

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(jobDetailsApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.apiResponseSuccess(data)
    } else {
      this.apiResponseFailure()
    }
  }

  // loader

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  // reload

  reloadPage = () => {
    this.setState({apiStatus: apiStatusConstant.pending}, this.getJobDetails)
  }

  // fail view

  renderFailtureView = () => (
    <div className="fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-btn" type="button" onClick={this.reloadPage}>
        Retry
      </button>
    </div>
  )

  render() {
    const {
      jobDetails,
      lifeAtCompany,
      skillsList,
      similarJobsList,
      apiStatus,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {lifeAtCompanydescription, lifeAtCompanyimageUrl} = lifeAtCompany

    const renderSucessView = () => (
      <>
        <Header />
        <div className="job-details-page-container">
          <div className="job-details-card">
            <div className="logo-title-container">
              <img
                className="componey-logo-img"
                src={companyLogoUrl}
                alt="job details company logo"
              />
              <div className="job-title-rating-container">
                <h1 className="job-title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star-icon" />
                  <p>{rating}</p>
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
            <div className="description-heading-visit-container">
              <h1 className="description-heading">Description</h1>
              <a className="visit-link" href={companyWebsiteUrl}>
                Visit <RiExternalLinkFill />
              </a>
            </div>
            <p>{jobDescription}</p>
            <h1 className="heading-2">Skills</h1>
            <ul className="skills-card-container">
              {skillsList.map(eachItem => (
                <li key={eachItem.skillsName} className="skills-card">
                  <img
                    src={eachItem.skillsImageUrl}
                    alt={eachItem.skillsName}
                  />
                  <p>{eachItem.skillsName}</p>
                </li>
              ))}
            </ul>
            <h1 className="heading-2">Life at Company</h1>
            <div className="life-at-company-contaienr">
              <p className="life-at-company-contaienr-para">
                {lifeAtCompanydescription}
              </p>
              <img
                className="life-at-company-contaienr-img"
                src={lifeAtCompanyimageUrl}
                alt="life of company img"
              />
            </div>
          </div>
          <h1>Similar Jobs</h1>
          <ul className="similar-job-container">
            {similarJobsList.map(eachItem => (
              <SimilarJob
                key={eachItem.similarJobid}
                similarJobDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </>
    )

    const renderPage = () => {
      switch (apiStatus) {
        case apiStatusConstant.pending:
          return this.renderLoader()
        case apiStatusConstant.success:
          return renderSucessView()
        case apiStatusConstant.fail:
          return this.renderFailtureView()
        default:
          return null
      }
    }

    return renderPage()
  }
}

export default JobDetails
