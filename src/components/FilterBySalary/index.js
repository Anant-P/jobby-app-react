import './index.css'

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

const FilterBySalary = props => {
  const {selectedSalaryValue} = props
  const onSalaryChange = event => {
    selectedSalaryValue(event.target.value)
  }
  return (
    <div className="filter-by-type-container">
      <h1 className="filter-heading">Salary Range</h1>
      {salaryRangesList.map(eachItem => (
        <div key={eachItem.label}>
          <input
            className="radio-input"
            id={eachItem.salaryRangeId}
            type="radio"
            name="salary"
            value={eachItem.salaryRangeId}
            onClick={onSalaryChange}
          />
          <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
          <br />
        </div>
      ))}
    </div>
  )
}

export default FilterBySalary
