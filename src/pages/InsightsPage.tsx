import { useState } from 'react'
import type { SalaryByCountry, SalaryByJobTitle } from '../types/employee'
import { getSalaryByCountry, getSalaryByJobTitle } from '../services/insightService'

const COUNTRIES = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Singapore']

type Tab = 'country' | 'job_title'

export default function InsightsPage() {
  const [activeTab, setActiveTab]         = useState<Tab>('country')
  const [country, setCountry]             = useState('')
  const [jobTitle, setJobTitle]           = useState('')
  const [countryStats, setCountryStats]   = useState<SalaryByCountry | null>(null)
  const [jobTitleStats, setJobTitleStats] = useState<SalaryByJobTitle | null>(null)
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState<string | null>(null)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setCountry('')
    setJobTitle('')
    setCountryStats(null)
    setJobTitleStats(null)
    setError(null)
  }

  const handleSearch = async () => {
    if (!country) return
    setLoading(true)
    setError(null)

    try {
      if (activeTab === 'country') {
        const stats = await getSalaryByCountry(country)
        setCountryStats(stats)
      } else {
        if (!jobTitle) return
        const stats = await getSalaryByJobTitle(country, jobTitle)
        setJobTitleStats(stats)
      }
    } catch {
      setError('Failed to load insights')
    } finally {
      setLoading(false)
    }
  }
  const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setCountry(selected)
    setCountryStats(null)
    setError(null)
  
    if (!selected) return
  
    setLoading(true)
    try {
      const stats = await getSalaryByCountry(selected)
      setCountryStats(stats)
    } catch {
      setError('Failed to load insights')
    } finally {
      setLoading(false)
    }
  }

  const isSearchDisabled = activeTab === 'country' ? !country : !country || !jobTitle


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Salary Insights</h2>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {(['country', 'job_title'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'country' ? 'By Country' : 'By Job Title'}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              value={country}
              onChange={activeTab === 'country' ? handleCountryChange : e => setCountry(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Country</option>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {activeTab === 'job_title' && (
            <>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSearch}
                disabled={!country || !jobTitle || loading}
                className="px-6 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Search'}
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {/* Country Stats */}
      {activeTab === 'country' && countryStats && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Salary Overview — {countryStats.country}
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Total Employees', value: countryStats.count.toLocaleString() },
              { label: 'Average Salary',  value: `$${countryStats.average.toLocaleString()}` },
              { label: 'Minimum Salary',  value: `$${countryStats.min.toLocaleString()}` },
              { label: 'Maximum Salary',  value: `$${countryStats.max.toLocaleString()}` }
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-5">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Job Title Stats */}
      {activeTab === 'job_title' && jobTitleStats && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            "{jobTitleStats.job_title}" in {jobTitleStats.country}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Employees with this title', value: jobTitleStats.count.toLocaleString() },
              { label: 'Average Salary',            value: `$${jobTitleStats.average.toLocaleString()}` }
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-5">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!countryStats && !jobTitleStats && !loading && (
        <div className="text-center py-12 text-gray-400 text-sm">
          {activeTab === 'country'
            ? 'Select a country to view salary insights'
            : 'Select a country and enter a job title to view insights'}
        </div>
      )}
    </div>
  )
}