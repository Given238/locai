import { useState } from 'react'

const PHOTO_THEMES = {
  1: { from: '#0a4a4d', to: '#0D7377' },
  2: { from: '#7c2d12', to: '#c2410c' },
  3: { from: '#1e1b4b', to: '#3730a3' },
}

const SPECIALTY_COLORS = {
  Trekking:    { bg: '#d1fae5', text: '#065f46' },
  Cultural:    { bg: '#fef3c7', text: '#92400e' },
  Photography: { bg: '#e0e7ff', text: '#3730a3' },
  'Local Food':{ bg: '#ffe4e6', text: '#9f1239' },
  Fishing:     { bg: '#e0f2fe', text: '#0369a1' },
}

function PersonSilhouette() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="22" r="12" fill="rgba(255,255,255,0.25)" />
      <path d="M8 58c0-13.25 10.75-24 24-24s24 10.75 24 24" fill="rgba(255,255,255,0.25)" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function VerifiedBadge() {
  return (
    <div
      className="flex items-center gap-1 px-2 py-[3px] rounded-full"
      style={{ background: '#0D7377' }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      <span className="text-white text-[10px] font-semibold">Verified</span>
    </div>
  )
}

function MapPinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function GuideCard({ guide, onClick }) {
  const [imgFailed, setImgFailed] = useState(false)
  const theme = PHOTO_THEMES[guide.id] || PHOTO_THEMES[1]
  const priceFormatted = `Rp${(guide.pricePerDay / 1000).toFixed(0)}k`

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform duration-150 hover:shadow-lg"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}
    >
      {/* Photo area */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          height: '148px',
          background: `linear-gradient(160deg, ${theme.from} 0%, ${theme.to} 100%)`,
        }}
      >
        {/* Real photo — falls back to silhouette on error */}
        {guide.photo && !imgFailed ? (
          <img
            src={guide.photo}
            alt={guide.name}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <PersonSilhouette />
        )}

        {/* Dark scrim so badges are readable over photos */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)' }}
        />

        {/* Verified badge — top right */}
        {guide.verified && (
          <div className="absolute top-3 right-3 z-10">
            <VerifiedBadge />
          </div>
        )}

        {/* Price — bottom left */}
        <div
          className="absolute bottom-3 left-3 z-10 px-2 py-1 rounded-lg"
          style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(4px)' }}
        >
          <span className="text-white text-[12px] font-semibold">{priceFormatted}/day</span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-gray-900 font-semibold text-[15px] leading-tight flex-1">
            {guide.name}
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <StarIcon />
            <span className="text-gray-700 text-[13px] font-medium">{guide.rating}</span>
            <span className="text-gray-400 text-[12px]">({guide.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-1">
          <MapPinIcon />
          <span className="text-gray-400 text-[12px]">{guide.location}</span>
        </div>

        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {guide.specialty.map((tag) => {
            const colors = SPECIALTY_COLORS[tag] || { bg: '#f3f4f6', text: '#374151' }
            return (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
