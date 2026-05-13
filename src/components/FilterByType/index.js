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

const FilterByType = props => {
  const {selectedTypeValue} = props

  const onTypeChange = event => {
    selectedTypeValue(event.target.value, event.target.checked)
  }
  return (
    <div className="filter-by-type-container">
      <h1 className="filter-heading">Type of Employment</h1>
      {employmentTypesList.map(eachItem => (
        <div key={eachItem.label}>
          <input
            className="checkbox-input"
            id={eachItem.employmentTypeId}
            type="checkbox"
            value={eachItem.employmentTypeId}
            onClick={onTypeChange}
          />
          <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          <br />
        </div>
      ))}
    </div>
  )
}

export default FilterByType
