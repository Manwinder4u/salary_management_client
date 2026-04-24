import { useState, useEffect, useCallback } from 'react'
import type { Employee, PaginatedEmployees, EmployeeFormData } from '../types/employee'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../services/employeeService'
import EmployeeTable from '../components/employees/EmployeeTable'
import EmployeeForm from '../components/employees/EmployeeForm'
import Pagination from '../components/shared/Pagination'

export default function EmployeesPage() {
  const [data, setData]             = useState<PaginatedEmployees | null>(null)
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [page, setPage]             = useState(1)
  const [showForm, setShowForm]     = useState(false)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [saving, setSaving]         = useState(false)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getEmployees(page, 20)
      setData(result)
    } catch {
      setError('Failed to load employees')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleSubmit = async (formData: EmployeeFormData) => {
    setSaving(true)
    try {
      if (editEmployee) {
        await updateEmployee(editEmployee.id, formData)
      } else {
        await createEmployee(formData)
      }
      setShowForm(false)
      setEditEmployee(null)
      fetchEmployees()
    } catch {
      setError('Failed to save employee')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (employee: Employee) => {
    setEditEmployee(employee)
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    try {
      await deleteEmployee(id)
      fetchEmployees()
    } catch {
      setError('Failed to delete employee')
    }
  }

  const handleAddNew = () => {
    setEditEmployee(null)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditEmployee(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          {data && (
            <p className="text-sm text-gray-500 mt-1">
              {data.meta.total_count.toLocaleString()} total employees
            </p>
          )}
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {editEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          <EmployeeForm
            employee={editEmployee}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={saving}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading employees...</div>
      ) : (
        <>
          {data && data.data.length > 0 ? (
            <>
              <EmployeeTable
                employees={data.data}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              <Pagination
                currentPage={data.meta.current_page}
                totalPages={data.meta.total_pages}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No employees found.
            </div>
          )}
        </>
      )}
    </div>
  )
}