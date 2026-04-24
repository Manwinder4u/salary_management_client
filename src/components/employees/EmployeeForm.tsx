import { useState, useEffect } from 'react'
import type { Employee, EmployeeFormData } from '../../types/employee'

interface EmployeeFormProps {
  employee?: Employee | null
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

const DEPARTMENTS = ['Engineering', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal']
const COUNTRIES   = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Singapore']

const emptyForm: EmployeeFormData = {
  first_name: '',
  last_name: '',
  email: '',
  job_title: '',
  department: '',
  country: '',
  salary: 0,
  hire_date: ''
}

export default function EmployeeForm({ employee, onSubmit, onCancel, isLoading }: EmployeeFormProps) {
  const [form, setForm] = useState<EmployeeFormData>(emptyForm)

  useEffect(() => {
    if (employee) {
      setForm({
        first_name: employee.first_name,
        last_name:  employee.last_name,
        email:      employee.email,
        job_title:  employee.job_title,
        department: employee.department,
        country:    employee.country,
        salary:     employee.salary,
        hire_date:  employee.hire_date
      })
    } else {
      setForm(emptyForm)
    }
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input name="first_name" value={form.first_name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input name="last_name" value={form.last_name} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input name="job_title" value={form.job_title} onChange={handleChange} required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select name="department" value={form.department} onChange={handleChange} required className={inputClass}>
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select name="country" value={form.country} onChange={handleChange} required className={inputClass}>
            <option value="">Select Country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary ($)</label>
          <input name="salary" type="number" 
            value={form.salary === 0 ? '' : form.salary}
            onChange={handleChange} required min={1} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
          <input name="hire_date" type="date" value={form.hire_date} onChange={handleChange} required className={inputClass} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>
    </form>
  )
}