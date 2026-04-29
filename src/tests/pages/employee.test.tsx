import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as service from '../../services/employeeService'
import EmployeesPage from '../../pages/EmployeesPage'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../../services/employeeService')

const mockEmployee = {
  id: 1,
  first_name: 'John',
  last_name: 'Doe',
  job_title: 'Engineer',
  email: 'john@test.com',
  department: 'Engineering',
  country: 'India',
  salary: 10000,
  hire_date: '2023-01-01',
  created_at: '',
  updated_at: ''
}

const mockPaginatedResponse = {
  data: [mockEmployee],
  meta: { total_count: 1, current_page: 1, total_pages: 1, per_page: 20 }
}

const renderPage = () =>
  render(
    <BrowserRouter>
      <EmployeesPage />
    </BrowserRouter>
  )

beforeEach(() => {
  vi.mocked(service.getEmployees).mockResolvedValue(mockPaginatedResponse)
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

describe('EmployeesPage', () => {
  it('loads and displays employees', async () => {
    renderPage()
    expect(await screen.findByText('John Doe')).toBeInTheDocument()
  })

  it('calls API with search term', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })

    renderPage()

    await waitFor(() => {
      expect(service.getEmployees).toHaveBeenCalled()
    })

    const input = screen.getByPlaceholderText(/search by name/i)
    fireEvent.change(input, { target: { value: 'john' } })

    await act(async () => {
      vi.advanceTimersByTime(600)
    })

    await waitFor(() => {
      expect(service.getEmployees).toHaveBeenCalledWith(1, 20, 'john')
    })
  })

  it('deletes employee and refetches', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(service.deleteEmployee).mockResolvedValue(undefined)

    renderPage()

    const deleteBtn = await screen.findByRole('button', { name: /delete/i })
    fireEvent.click(deleteBtn)

    await waitFor(() => {
      expect(service.deleteEmployee).toHaveBeenCalledWith(1)
    })
  })
})