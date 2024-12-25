import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {jobDetails: [], isLoading: true, isFailed: false}

  componentDidMount() {
    this.getJobDetails()
  }

  onGetJobsSuccess = (jobDetails, similarJobs) => {
    const formattedDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      comapnyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills,
      title: jobDetails.title,
    }

    this.setState({
      jobDetails: formattedDetails,
      similarJobs,
      isLoading: false,
      isFailed: false,
    })
  }

  onGetJobsFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs

      this.onGetJobsSuccess(jobDetails, similarJobs)
    } else {
      this.setState({isFailed: true, isLoading: false})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {jobDetails, isLoading, similarJobs, isFailed} = this.state
    const {
      title,
      skills,
      rating,
      packagePerAnnum,
      location,
      lifeAtCompany,
      jobDescription,
      employmentType,
      comapnyWebsiteUrl,
      companyLogoUrl,
    } = jobDetails
    console.log(similarJobs)
    return (
      <>
        <Header />
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div>
            {isFailed ? (
              this.onGetJobsFailure()
            ) : (
              <div className="job-details-body-container">
                <div className="jobs-item-details-container">
                  <div className="logo-title-rating-container">
                    <img
                      src={companyLogoUrl}
                      alt="job details company logo"
                      className="company-logo"
                    />
                    <div className="title-rating-container">
                      <h1 className="job-title">{title}</h1>
                      <div className="rating-container">
                        <FaStar className="star-icon" />
                        <p className="rating">{rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="location-empType-package-container">
                    <div className="location-empType-container">
                      <div className="location-container">
                        <MdLocationOn className="jobs-icons" />
                        <p className="location">{location}</p>
                      </div>
                      <div className="location-container">
                        <BsFillBriefcaseFill className="jobs-icons" />
                        <p className="location">{employmentType}</p>
                      </div>
                    </div>
                    <div className="package-container">
                      <p className="package">{packagePerAnnum}</p>
                    </div>
                  </div>
                  <div className="description-container">
                    <div className="visit-description-container">
                      <h1 className="description-heading">Description</h1>
                      <div className="visit-container">
                        <a
                          className="visit-link"
                          href={comapnyWebsiteUrl}
                          target="blank"
                        >
                          Visit
                        </a>
                        <FaExternalLinkAlt className="jobs-icons" />
                      </div>
                    </div>
                    <p className="description">{jobDescription}</p>
                  </div>
                  <div className="description-container">
                    <h1 className="description-heading">Skills</h1>
                    <ul className="skills-list-container">
                      {skills.map(eachItem => (
                        <li key={eachItem.name} className="skills-list-item">
                          <img src={eachItem.image_url} alt={eachItem.name} />
                          <p className="skills-name">{eachItem.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="life-at-company-container">
                    <div>
                      <h1 className="description-heading">Life at Company</h1>
                      <p className="life-at-company-description">
                        {lifeAtCompany.description}
                      </p>
                    </div>
                    <img src={lifeAtCompany.image_url} alt="life at company" />
                  </div>
                </div>
                <div>
                  <h1 className="description-heading">Similar Jobs</h1>
                  <ul className="similar-jobs-list-container">
                    {similarJobs.map(eachItem => (
                      <li key={eachItem.id}>
                        <Link
                          to={`/jobs/${eachItem.id}`}
                          className="similar-jobs-link"
                        >
                          <div className="similar-job-container">
                            <div className="logo-title-rating-container">
                              <img
                                src={eachItem.company_logo_url}
                                alt="similar job company logo"
                                className="company-logo"
                              />
                              <div className="title-rating-container">
                                <h1 className="job-title">{eachItem.title}</h1>
                                <div className="rating-container">
                                  <FaStar className="star-icon" />
                                  <p className="rating">{eachItem.rating}</p>
                                </div>
                              </div>
                            </div>
                            <div className="description-container">
                              <div className="visit-description-container">
                                <h1 className="description-heading">
                                  Description
                                </h1>
                              </div>
                              <p className="description">
                                {eachItem.job_description}
                              </p>
                            </div>
                            <div className="location-empType-container">
                              <div className="location-container">
                                <MdLocationOn className="jobs-icons" />
                                <p className="location">{eachItem.location}</p>
                              </div>
                              <div className="location-container">
                                <BsFillBriefcaseFill className="jobs-icons" />
                                <p className="location">
                                  {eachItem.employment_type}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails
