import { describe, it, expect, vi, beforeEach } from 'vitest'
import api from '../../services/api'
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../../services/employeeService'

vi.mock('../../services/api')

const mockedApi = vi.mocked(api)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('employeeService', () => {
  describe('getEmployees', () => {
    it('calls GET /employees with pagination params', async () => {
      const mockData = { data: [], meta: { total_count: 0, current_page: 1, total_pages: 1, per_page: 20 } }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })

      const result = await getEmployees(1, 20)

      expect(mockedApi.get).toHaveBeenCalledWith('/employees', { params: { page: 1, per_page: 20 } })
      expect(result).toEqual(mockData)
    })
  })

  describe('getEmployee', () => {
    it('calls GET /employees/:id', async () => {
      const mockEmployee = { id: 1, first_name: 'John' }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockEmployee })

      const result = await getEmployee(1)

      expect(mockedApi.get).toHaveBeenCalledWith('/employees/1')
      expect(result).toEqual(mockEmployee)
    })
  })

  describe('createEmployee', () => {
    it('calls POST /employees with employee data', async () => {
      const formData = { first_name: 'John', last_name: 'Smith', email: 'john@test.com', job_title: 'Engineer', department: 'Engineering', country: 'India', salary: 50000, hire_date: '2023-01-01' }
      const mockResponse = { id: 1, ...formData }
      mockedApi.post = vi.fn().mockResolvedValue({ data: mockResponse })

      const result = await createEmployee(formData)

      expect(mockedApi.post).toHaveBeenCalledWith('/employees', { employee: formData })
      expect(result).toEqual(mockResponse)
    })
  })

  describe('updateEmployee', () => {
    it('calls PATCH /employees/:id with updated data', async () => {
      const formData = { first_name: 'Updated' }
      mockedApi.patch = vi.fn().mockResolvedValue({ data: { id: 1, ...formData } })

      await updateEmployee(1, formData)

      expect(mockedApi.patch).toHaveBeenCalledWith('/employees/1', { employee: formData })
    })
  })

  describe('deleteEmployee', () => {
    it('calls DELETE /employees/:id', async () => {
      mockedApi.delete = vi.fn().mockResolvedValue({})

      await deleteEmployee(1)

      expect(mockedApi.delete).toHaveBeenCalledWith('/employees/1')
    })
  })

  describe("getEmployees with search", () => {
    it("calls GET /employees with search param", async () => {
      const mockData = {
        data: [],
        meta: { total_count: 0, current_page: 1, total_pages: 1, per_page: 20 }
      }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })

      await getEmployees(1, 20, "Manwinder")

      expect(mockedApi.get).toHaveBeenCalledWith("/employees", {
        params: { page: 1, per_page: 20, search: "Manwinder" }
      })
    })

    it("does not send search param when empty", async () => {
      const mockData = {
        data: [],
        meta: { total_count: 0, current_page: 1, total_pages: 1, per_page: 20 }
      }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })
  
      await getEmployees(1, 20, "")
  
      expect(mockedApi.get).toHaveBeenCalledWith("/employees", {
        params: { page: 1, per_page: 20, search: undefined }
      })
    })
  })
})