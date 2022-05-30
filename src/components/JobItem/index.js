import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
  } = jobData

  const renderJobDetails = () => (
    <div className="logo-card">
      <img
        src={companyLogoUrl}
        alt="similar job company logo"
        className="company-logo"
      />
      <div className="title-box">
        <h1 className="title">{title}</h1>
        <div className="star-box">
          <FaStar className="star" />
          <p className="rating">{rating}</p>
        </div>
      </div>
    </div>
  )

  const renderAdditionalDetails = () => (
    <div>
      <div className="icons-container">
        <div className="icon-box">
          <GoLocation size="30" color="#ffffff" />
          <p className="location-name">{location}</p>
          <BsBriefcaseFill size="30" color="#ffffff" />
          <p className="location-name">{employmentType}</p>
        </div>
        <h1 className="package">{packagePerAnnum}</h1>
      </div>
      <hr className="hr-line" />
      <p className="content">{jobDescription}</p>
    </div>
  )

  return (
    <Link className="link-item" to={`/jobs/${id}`}>
      <li className="list-item">
        <div className="super-box">
          {renderJobDetails()}
          {renderAdditionalDetails()}
        </div>
      </li>
    </Link>
  )
}

export default JobItem
