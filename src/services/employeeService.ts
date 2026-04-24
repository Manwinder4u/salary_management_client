import api from './api'
import { Employee, EmployeeFormData, PaginatedEmployees } from '../types/employee'

export const getEmployees = async (page = 1, perPage = 20): Promise<PaginatedEmployees> => {
  const { data } = await api.get('/employees', { params: { page, per_page: perPage } })
  return data
}

export const getEmployee = async (id: number): Promise<Employee> => {
  const { data } = await api.get(`/employees/${id}`)
  return data
}

export const createEmployee = async (employee: EmployeeFormData): Promise<Employee> => {
  const { data } = await api.post('/employees', { employee })
  return data
}

export const updateEmployee = async (id: number, employee: Partial<EmployeeFormData>): Promise<Employee> => {
  const { data } = await api.patch(`/employees/${id}`, { employee })
  return data
}

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`)
}