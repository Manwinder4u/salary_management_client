import api from './api'
import type { SalaryByCountry, SalaryByJobTitle, SalaryByDepartment, HeadcountByCountry } from '../types/employee'


export const getSalaryByCountry = async (country: string): Promise<SalaryByCountry> => {
  const { data } = await api.get('/insights/salary_by_country', { params: { country } })
  return data
}

export const getSalaryByJobTitle = async (country: string, job_title: string): Promise<SalaryByJobTitle> => {
  const { data } = await api.get('/insights/salary_by_job_title', { params: { country, job_title } })
  return data
}

export const getSalaryByDepartment = async (country: string): Promise<SalaryByDepartment[]> => {
  const { data } = await api.get("/insights/salary_by_department", { params: { country } })
  return data
}

export const getHeadcountByCountry = async (): Promise<HeadcountByCountry[]> => {
  const { data } = await api.get("/insights/headcount_by_country")
  return data
}