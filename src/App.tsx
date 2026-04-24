import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import EmployeesPage from './pages/EmployeesPage'
import InsightsPage from './pages/InsightsPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App