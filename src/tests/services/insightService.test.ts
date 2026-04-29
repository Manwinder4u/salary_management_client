import { describe, it, expect, vi, beforeEach } from 'vitest'
import api from '../../services/api'
import {
  getSalaryByCountry,
  getSalaryByJobTitle
} from '../../services/insightService'

vi.mock('../../services/api')

const mockedApi = vi.mocked(api)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('insightService', () => {
  describe('getSalaryByCountry', () => {
    it('calls GET /insights/salary_by_country with country param', async () => {
      const mockData = { country: 'India', min: 50000, max: 90000, average: 70000, count: 3 }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })

      const result = await getSalaryByCountry('India')

      expect(mockedApi.get).toHaveBeenCalledWith('/insights/salary_by_country', { params: { country: 'India' } })
      expect(result).toEqual(mockData)
    })
  })

  describe('getSalaryByJobTitle', () => {
    it('calls GET /insights/salary_by_job_title with params', async () => {
      const mockData = { country: 'India', job_title: 'Engineer', average: 60000, count: 2 }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })

      const result = await getSalaryByJobTitle('India', 'Engineer')

      expect(mockedApi.get).toHaveBeenCalledWith('/insights/salary_by_job_title', { params: { country: 'India', job_title: 'Engineer' } })
      expect(result).toEqual(mockData)
    })

    it("returns min, max, average and count for job title in country", async () => {
      const mockData = {
        country: "India",
        job_title: "Engineer",
        average: 60_000,
        count: 2,
        min: 50_000,
        max: 70_000
      }
      mockedApi.get = vi.fn().mockResolvedValue({ data: mockData })
  
      const result = await getSalaryByJobTitle("India", "Engineer")
  
      expect(mockedApi.get).toHaveBeenCalledWith("/insights/salary_by_job_title", {
        params: { country: "India", job_title: "Engineer" }
      })
      expect(result.min).toEqual(50_000)
      expect(result.max).toEqual(70_000)
      expect(result.average).toEqual(60_000)
      expect(result.count).toEqual(2)
    })
  })


})