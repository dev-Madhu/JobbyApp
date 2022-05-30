import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'
import FilterJobs from '../FilterJobs'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsRoute extends Component {
  state = {
    jobDetails: [],
    profileDetails: {},
    activeEmploymentTypeId: employmentTypesList[0].employmentTypeId,
    activeSalaryRangeId: salaryRangesList[0].salaryRangeId,
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/profile`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileDetails: profileData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(activeSalaryRangeId)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
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
        jobDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeCategoryId = activeEmploymentTypeId => {
    this.setState({activeEmploymentTypeId}, this.getJobDetails)
  }

  changeSalaryRangeId = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobDetails)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  onChangeSearchInput = event => {
    this.changeSearchInput(event.target.value)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderJobDetailsListView = () => {
    const {jobDetails, searchInput} = this.state
    const shouldShowJobsList = jobDetails.length > 0

    return shouldShowJobsList ? (
      <div className="jobs-view-section">
        <div className="search-input-container">
          <input
            value={searchInput}
            type="search"
            className="search-input"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
          />
          <BsSearch className="search-icon" />
        </div>
        <div className="unordered-list">
          <ul className="jobs-list">
            {jobDetails.map(eachJob => (
              <JobItem jobData={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-products-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
    </>
  )

  renderLoadingView = () => (
    <div className="job-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsListView()
      case apiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      profileDetails,
    } = this.state

    return (
      <>
        <Header />
        <div className="all-jobs-section">
          <FilterJobs
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            activeEmploymentTypeId={activeEmploymentTypeId}
            activeSalaryRangeId={activeSalaryRangeId}
            changeCategoryId={this.changeCategoryId}
            changeSalaryRangeId={this.changeCategoryId}
            profileDetails={profileDetails}
          />
          {this.renderAllJobs()}
        </div>
      </>
    )
  }
}

export default JobsRoute
