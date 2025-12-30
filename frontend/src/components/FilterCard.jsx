import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Filter } from 'lucide-react'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "System Engineer",
      "Data Analyst",
      "Java Developer"
    ]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const [isOpen, setIsOpen] = useState(false) // mobile toggle
  const dispatch = useDispatch()

  const changeHandler = (value) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue))
  }, [selectedValue])

  return (
    <div className="w-full">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between bg-white p-4 rounded-xl shadow border"
      >
        <span className="font-semibold text-lg">Filter Jobs</span>
        <Filter className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Card */}
      <div
        className={`
          bg-white p-5 rounded-2xl shadow-md border border-gray-200
          mt-3 md:mt-0
          ${isOpen ? 'block' : 'hidden'}
          md:block md:sticky md:top-24
        `}
      >
        <h1 className="font-bold text-lg">
          Filter{' '}
          <span className="bg-gradient-to-r from-red-500 to-orange-300 bg-clip-text text-transparent">
            Jobs
          </span>
        </h1>

        <hr className="my-3" />

        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-4">
              <h1 className="font-bold text-lg bg-gradient-to-r from-blue-950 to-purple-400 bg-clip-text text-transparent">
                {data.filterType}
              </h1>

              {data.array.map((item, idx) => {
                const itemId = `id-${index}-${idx}`
                return (
                  <div key={itemId} className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                )
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard
