import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    location,
    rating,
    title,
    jobDescription,
    packagePerAnnum,
  } = details
  return (
    <li className="jobs-details-container">
      <Link to={`/jobs/${id}`} className="job-nav-link">
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
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
