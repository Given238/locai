import { useState } from 'react'
import guidesData from '../data/guides.json'
import GuideCard from '../components/GuideCard.jsx'
import BottomNav from '../components/BottomNav.jsx'

const FILTERS = ['All', 'Trekking', 'Cultural', 'Photography', 'Fishing']

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

export default function Home({ navigate }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const guides = guidesData.guides.filter((g) => {
    const matchesFilter = activeFilter === 'All' || g.specialty.includes(activeFilter)
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      q === '' ||
      g.name.toLowerCase().includes(q) ||
      g.specialty.some((s) => s.toLowerCase().includes(q)) ||
      g.location.toLowerCase().includes(q)
    return matchesFilter && matchesSearch
  })

  return (
    <div className="flex flex-col bg-[#FAF7F2]" style={{ height: '812px' }}>

      {/* ── Header ── */}
      <div className="shrink-0 bg-white px-5 pt-12 pb-4" style={{ boxShadow: '0 1px 0 #F0EDEA' }}>
        {/* Greeting row */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-gray-400 text-[13px]">Lake Toba, Indonesia</p>
            <h1 className="text-gray-900 text-[22px] font-bold leading-tight">
              Find your guide
            </h1>
          </div>
          {/* Avatar placeholder */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #0D7377, #14a085)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        {/* Search bar */}
        <div
          className="flex items-center gap-3 mt-3 px-4 rounded-2xl"
          style={{ background: '#F0EDEA' }}
        >
          <SearchIcon />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, specialties…"
            className="flex-1 bg-transparent py-3 text-[14px] text-gray-700 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* ── Filter chips ── */}
      <div className="shrink-0 bg-white pt-3 pb-3">
        <div
          className="flex gap-2 px-5 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className="shrink-0 px-4 py-[7px] rounded-full text-[13px] font-medium transition-colors duration-150"
                style={
                  isActive
                    ? { background: '#0D7377', color: '#fff' }
                    : { background: '#F0EDEA', color: '#6B7280' }
                }
              >
                {filter}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Guide list (scrollable) ── */}
      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
        {/* Result count */}
        <p className="text-gray-400 text-[12px] font-medium mb-3">
          {guides.length} {guides.length === 1 ? 'guide' : 'guides'} available
        </p>

        {guides.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-gray-400 text-[14px] text-center">
              No guides for this specialty yet.
              <br />Try a different filter.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {guides.map((guide) => (
              <GuideCard
                key={guide.id}
                guide={guide}
                onClick={() => navigate('profile', guide)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom nav ── */}
      <BottomNav active="home" navigate={navigate} />
    </div>
  )
}
