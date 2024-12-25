import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobItem from '../JobItem'
import JobsSearchCategory from '../JobsSearchCategory'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
  empty: 'EMPTY',
}

class Jobs extends Component {
  state = {
    profileDetails: [],
    employmentType: [],
    minimumPackage: '',
    searchInput: '',
    jobsList: [],
    jobsStatus: jobsApiStatusConstants.initial,
    profileStatus: profileApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails,
        profileStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: profileApiStatusConstants.failed})
    }
  }

  onJobsAccessSuccess = jobs => {
    if (jobs.length === 0) {
      this.setState({jobsStatus: jobsApiStatusConstants.empty})
    } else {
      const formattedJobs = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
        jobDescription: eachJob.job_description,
        packagePerAnnum: eachJob.package_per_annum,
      }))
      this.setState({
        jobsList: formattedJobs,
        jobsStatus: jobsApiStatusConstants.success,
      })
    }
  }

  onJobsAccessFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-button" type="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  onProfileAccessFailure = () => (
    <div>
      <button className="retry-button" type="button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  getJobs = async () => {
    this.setState({jobsStatus: jobsApiStatusConstants.loading})
    const {searchInput, employmentType, minimumPackage} = this.state
    const employmentTypeString = employmentType.join(',')
    console.log(employmentTypeString)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const {jobs} = data
      this.onJobsAccessSuccess(jobs)
    } else {
      this.setState({jobsStatus: jobsApiStatusConstants.failed})
    }
  }

  onSelectRange = id => {
    this.setState({minimumPackage: id}, this.getJobs)
  }

  onSelectEmploymentType = id => {
    const {employmentType} = this.state
    const newList = [...employmentType]
    if (employmentType.includes(id)) {
      newList.pop(id)
    } else {
      newList.push(id)
    }
    this.setState({employmentType: [...newList]}, this.getJobs)
  }

  onChangeSearchInput = event => {
    if (event.target.key === 'Enter') {
      this.getJobs()
    } else {
      this.setState({searchInput: event.target.value})
    }
  }

  renderProfileData = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-card-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderEmptyView = () => (
    <div className="empty-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsRightSection = () => (
    <>
      <div className="jobs-right-section-container">
        <div className="search-box-container">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="jobs-search-button"
              onClick={this.getJobs}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        <div className="jobs-container">
          <div>{this.renderJobsSection()}</div>
        </div>
      </div>
    </>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(eachItem => (
          <JobItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderJobSearchCAtegory = () => (
    <div>
      <JobsSearchCategory
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        onSelectRange={this.onSelectRange}
        onSelectEmploymentType={this.onSelectEmploymentType}
      />
    </div>
  )

  renderProfileSection = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case profileApiStatusConstants.success:
        return this.renderProfileData()
      case profileApiStatusConstants.failed:
        return this.onProfileAccessFailure()
      case profileApiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderBodySection = () => (
    <div className="jobs-body-container">
      <div className="jobs-left-section-container">
        {this.renderProfileSection()}
        {this.renderJobSearchCAtegory()}
      </div>
      {this.renderJobsRightSection()}
    </div>
  )

  renderJobsSection = () => {
    const {jobsStatus} = this.state
    switch (jobsStatus) {
      case jobsApiStatusConstants.success:
        return this.renderJobsSuccessView()
      case jobsApiStatusConstants.failed:
        return this.onJobsAccessFailure()
      case jobsApiStatusConstants.empty:
        return this.renderEmptyView()
      case jobsApiStatusConstants.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderBodySection()}
      </>
    )
  }
}

export default Jobs
