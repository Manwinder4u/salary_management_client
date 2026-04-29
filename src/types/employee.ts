export interface Employee {
  id: number
  first_name: string
  last_name: string
  email: string
  job_title: string
  department: string
  country: string
  salary: number
  hire_date: string
  created_at: string
  updated_at: string
}

export interface EmployeeFormData {
  first_name: string
  last_name: string
  email: string
  job_title: string
  department: string
  country: string
  salary: number
  hire_date: string
}

export interface PaginatedEmployees {
  data: Employee[]
  meta: {
    total_count: number
    current_page: number
    total_pages: number
    per_page: number
  }
}

export interface SalaryByCountry {
  country: string
  min: number
  max: number
  average: number
  count: number
}

export interface SalaryByJobTitle {
  country: string
  job_title: string
  average: number
  count: number
  min: number
  max: number
}

export interface SalaryByDepartment {
  department: string
  min: number
  max: number
  average: number
  count: number
}

export interface HeadcountByCountry {
  country: string
  count: number
}