import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Salary Management
        </h1>
        <div className="flex gap-6">
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-medium border-b-2 border-blue-600 pb-1'
                : 'text-gray-600 hover:text-blue-600'
            }
            >
              Employees
          </NavLink>
        </div>
      </div>
    </nav>
  )
}