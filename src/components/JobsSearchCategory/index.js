import './index.css'

const JobsSearchCategory = props => {
  const {
    employmentTypesList,
    locationTypesList,
    salaryRangesList,
    onSelectEmploymentType,
    onSelectLocationType,
    onSelectRange,
  } = props
  return (
    <div>
      <div>
        <h1 className="category-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(eachItem => {
            const {employmentTypeId, label} = eachItem
            const onSelectItem = () => {
              onSelectEmploymentType(employmentTypeId)
            }
            return (
              <li className="employment-type-item" key={employmentTypeId}>
                <input
                  type="checkbox"
                  id={employmentTypeId}
                  value={employmentTypeId}
                  onClick={onSelectItem}
                />
                <label htmlFor={employmentTypeId}>{label}</label>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h1 className="category-heading">Salary Range</h1>
        <ul className="employment-type-list">
          {salaryRangesList.map(eachItem => {
            const {salaryRangeId, label} = eachItem
            const onSelectItem = () => {
              onSelectRange(salaryRangeId)
            }
            return (
              <li className="employment-type-item" key={salaryRangeId}>
                <input
                  id={salaryRangeId}
                  type="radio"
                  name="salary-range"
                  value={salaryRangeId}
                  onClick={onSelectItem}
                />
                <label htmlFor={salaryRangeId}>{label}</label>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h1 className="category-heading">Location</h1>
        <ul className="employment-type-list">
          {locationTypesList.map(eachItem => {
            const {locationTypeId, label} = eachItem
            const onSelectItem = () => {
              onSelectLocationType(locationTypeId)
            }
            return (
              <li className="employment-type-item" key={locationTypeId}>
                <input
                  type="checkbox"
                  id={locationTypeId}
                  value={locationTypeId}
                  onClick={onSelectItem}
                />
                <label htmlFor={locationTypeId}>{label}</label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default JobsSearchCategory
