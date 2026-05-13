import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import UserProfile from '../UserProfile'
import FilterByType from '../FilterByType'
import FilterBySalary from '../FilterBySalary'
import JobListItem from '../JobListItem'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Jobs extends Component {
  state = {
    jobList: [],
    employmentType: [],
    minimumPackage: '',
    search: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount = () => {
    this.setState({apiStatus: apiStatusConstant.pending}, this.getJobList)
  }

  // filtring result

  selectedTypeValue = (value, isChecked) => {
    this.setState(preState => {
      if (isChecked === true) {
        return {employmentType: [...preState.employmentType, value]}
      }
      return {
        employmentType: preState.employmentType.filter(
          eachItem => eachItem !== value,
        ),
      }
    }, this.getJobList)
  }

  selectedSalaryValue = value => {
    this.setState({minimumPackage: value}, this.getJobList)
  }

  handleSearchEnter = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  onSearchIconClick = () => {
    this.getJobList()
  }

  searchChange = event => {
    this.setState({search: event.target.value})
  }

  // api caling and succes, fail case handling

  jobsApiResponseSuccess = data => {
    const formatedData = data.jobs.map(eachItem => ({
      id: eachItem.id,
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      jobDescription: eachItem.job_description,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    this.setState({jobList: formatedData, apiStatus: apiStatusConstant.success})
  }

  apiResponseFailure = () => {
    this.setState({apiStatus: apiStatusConstant.fail})
  }

  getJobList = async () => {
    this.setState({apiStatus: apiStatusConstant.pending})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, search} = this.state
    const formatedEmploymentType = employmentType.join(',')
    const jobListApiUrl = `https://apis.ccbp.in/jobs?employment_type=${formatedEmploymentType}&minimum_package=${minimumPackage}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(jobListApiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      this.jobsApiResponseSuccess(data)
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

  // reloading result

  jobReloadPage = () => {
    this.setState({apiStatus: apiStatusConstant.pending}, this.getJobList)
  }

  // failure view jsx

  renderJobFailtureView = () => (
    <div className="job-fail-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.jobReloadPage}>
        Retry
      </button>
    </div>
  )

  // job not found

  renderNoJobFound = () => (
    <div className="job-not-found-container">
      <img
        className="no-job-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters.</p>
    </div>
  )

  render() {
    const {jobList, search, apiStatus} = this.state

    const renderJobSucessView = () => {
      if (jobList.length === 0) {
        return this.renderNoJobFound()
      }
      return (
        <ul className="job-card-container">
          {jobList.map(eachItem => (
            <JobListItem key={eachItem.id} jobDetails={eachItem} />
          ))}
        </ul>
      )
    }

    const renderJobPage = () => {
      switch (apiStatus) {
        case apiStatusConstant.pending:
          return this.renderLoader()
        case apiStatusConstant.success:
          return renderJobSucessView()
        case apiStatusConstant.fail:
          return this.renderJobFailtureView()
        default:
          return null
      }
    }

    return (
      <>
        <Header />
        <div className="jobs-page-container">
          <div className="jobs-page-left">
            <UserProfile />
            <hr />
            <FilterByType selectedTypeValue={this.selectedTypeValue} />
            <hr />
            <FilterBySalary selectedSalaryValue={this.selectedSalaryValue} />
          </div>
          <div className="jobs-page-right">
            <div className="search-box">
              <input
                className="search-input"
                type="search"
                value={search}
                onChange={this.searchChange}
                onKeyDown={this.handleSearchEnter}
                placeholder="Search"
              />
              <button
                className="search-icon-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch
                  className="search-icon"
                  onClick={this.onSearchIconClick}
                />
              </button>
            </div>
            {renderJobPage()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
