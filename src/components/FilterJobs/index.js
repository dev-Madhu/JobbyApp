import './index.css'

const FilterJobs = props => {
  const renderProfileDetails = () => {
    const {profileDetails} = props
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile" alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  const renderRatingsFiltersList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeSalaryRangeId, activeSalaryRangeId} = props
      const onClickRatingItem = () => changeSalaryRangeId(range.salaryRangeId)

      const ratingClassName =
        activeSalaryRangeId === range.salaryRangeId ? `and-up` : `and-up`

      return (
        <li
          className="rating-item"
          key={range.salaryRangeId}
          onClick={onClickRatingItem}
        >
          <input
            type="radio"
            name="group"
            value={range.salaryRangeId}
            id="my-radio"
          />
          <label htmlFor="my-radio" className={ratingClassName}>
            {range.label}
          </label>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(category => {
      const {changeCategoryId, activeEmploymentTypeId} = props
      const onClickCategoryItem = () =>
        changeCategoryId(category.employmentTypeId)
      const isActive = category.employmentTypeId === activeEmploymentTypeId
      const categoryClassName = isActive ? `category-name ` : `category-name`

      return (
        <li
          className="category-item"
          key={category.employmentTypeId}
          onClick={onClickCategoryItem}
        >
          <input type="checkbox" className="checkbox" id="category-label" />
          <label htmlFor="category-label" className={categoryClassName}>
            {category.label}
          </label>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderProfileDetails()}
      <hr className="line" />
      {renderProductCategories()}
      <hr className="line" />
      {renderRatingsFilters()}
      <hr className="line" />
    </div>
  )
}

export default FilterJobs
