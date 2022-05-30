import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import JobItem from '../JobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {
    currentJobsList: {},
    skillsList: [],
    similarJobsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      const {history} = this.props
      history.replace('/login')
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const currentJobData = {
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        employmentType: fetchedData.job_details.employment_type,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: fetchedData.job_details.life_at_company.description,
        lifeAtCompanyImageUrl:
          fetchedData.job_details.life_at_company.image_url,
        id: fetchedData.job_details.id,
        location: fetchedData.job_details.location,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
      }

      const updatedSkillsList = fetchedData.job_details.skills.map(skill => ({
        name: skill.name,
        imageUrl: skill.image_url,
      }))

      const updatedJobsData = fetchedData.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        rating: job.rating,
        title: job.title,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        currentJobsList: currentJobData,
        skillsList: updatedSkillsList,
        similarJobsList: updatedJobsData,
        isLoading: false,
      })
    }
  }

  renderSimilarJobDetails = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="similar-jobs">
        {similarJobsList.map(eachJob => (
          <JobItem jobData={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  renderCurrentJobDetails = () => {
    const {currentJobsList, skillsList} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      jobDescription,
      location,
      employmentType,
      lifeAtCompany,
      lifeAtCompanyImageUrl,
      packagePerAnnum,
      rating,
    } = currentJobsList

    return (
      <>
        <div className="main-card">
          <div className="job-item">
            <div className="job-card">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="job-details-box">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-container">
              <div className="location">
                <GoLocation size="30" color="#ffffff" />
                <p className="location-name">{location}</p>
                <BsBriefcaseFill size="30" color="#ffffff" />
                <p className="location-name">{employmentType}</p>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-line" />
            <div className="description-container">
              <h1 className="description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="anchor">
                Visit <HiOutlineExternalLink className="link" size="30px" />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
            <h1 className="skills">Skills</h1>
            <ul className="skill-list">
              {skillsList.map(each => (
                <li key={each.name} className="list-item">
                  <img src={each.imageUrl} className="image" alt={each.name} />
                  <p className="name">{each.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="skills">Life At Company</h1>
            <div className="life-at-company">
              <p className="life-at-company-description"> {lifeAtCompany}</p>
              <img
                src={lifeAtCompanyImageUrl}
                className="lifeAtCompany"
                alt="life at company"
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="container">
            {this.renderCurrentJobDetails()}
            <h1 className="skills">Similar Jobs</h1>
            {this.renderSimilarJobDetails()}
          </div>
        )}
      </>
    )
  }
}

export default JobItemDetails
