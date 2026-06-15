const PHOTO_THEMES = {
  1: { from: '#0a4a4d', to: '#0D7377' },
  2: { from: '#7c2d12', to: '#c2410c' },
  3: { from: '#1e1b4b', to: '#3730a3' },
}

const SPECIALTY_COLORS = {
  Trekking:     { bg: '#d1fae5', text: '#065f46' },
  Cultural:     { bg: '#fef3c7', text: '#92400e' },
  Photography:  { bg: '#e0e7ff', text: '#3730a3' },
  'Local Food': { bg: '#ffe4e6', text: '#9f1239' },
  Fishing:      { bg: '#e0f2fe', text: '#0369a1' },
}

function BackButton({ onPress }) {
  return (
    <button
      onClick={onPress}
      className="w-10 h-10 rounded-full flex items-center justify-center active:opacity-70 transition-opacity"
      style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  )
}

function StarFilled() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D7377" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default function GuideProfile({ guide, navigate }) {
  if (!guide) {
    navigate('home')
    return null
  }

  const theme = PHOTO_THEMES[guide.id] || PHOTO_THEMES[1]
  const priceFormatted = `Rp${guide.pricePerDay.toLocaleString('id-ID')}`

  return (
    <div
      className="overflow-y-auto bg-[#FAF7F2]"
      style={{ height: '812px' }}
    >
      {/* ── Hero photo area (~40% of screen) ── */}
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{
          height: '325px',
          background: `linear-gradient(160deg, ${theme.from} 0%, ${theme.to} 100%)`,
        }}
      >
        {/* Person silhouette */}
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="38" r="22" fill="rgba(255,255,255,0.22)" />
          <path d="M10 100c0-24.9 20.1-45 45-45s45 20.1 45 45" fill="rgba(255,255,255,0.22)" />
        </svg>

        {/* Back button — top left */}
        <div className="absolute top-12 left-4">
          <BackButton onPress={() => navigate('home')} />
        </div>

        {/* Verified badge — top right */}
        {guide.verified && (
          <div
            className="absolute top-12 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span className="text-white text-[11px] font-semibold">Verified</span>
          </div>
        )}

        {/* Bottom fade into white card */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))',
          }}
        />
      </div>

      {/* ── Content card ── */}
      <div
        className="bg-white px-5 pt-6 pb-8"
        style={{ borderRadius: '28px 28px 0 0', marginTop: '-28px', position: 'relative' }}
      >
        {/* Name + rating row */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-gray-900 text-[20px] font-bold leading-snug flex-1">
            {guide.name}
          </h2>
          <div className="flex items-center gap-1 shrink-0 mt-0.5">
            <StarFilled />
            <span className="text-gray-800 text-[14px] font-semibold">{guide.rating}</span>
            <span className="text-gray-400 text-[12px]">({guide.reviewCount})</span>
          </div>
        </div>

        {/* Location + languages row */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <MapPinIcon />
            <span className="text-gray-400 text-[12px]">{guide.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <GlobeIcon />
            <span className="text-gray-400 text-[12px]">{guide.languages.join(', ')}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-600 text-[14px] leading-relaxed mt-4">
          {guide.bio}
        </p>

        {/* Specialty tags — horizontal scroll */}
        <div
          className="flex gap-2 mt-4 overflow-x-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {guide.specialty.map((tag) => {
            const colors = SPECIALTY_COLORS[tag] || { bg: '#f3f4f6', text: '#374151' }
            return (
              <span
                key={tag}
                className="shrink-0 text-[12px] font-semibold px-3 py-1 rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {tag}
              </span>
            )
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-5" />

        {/* What's included */}
        <div className="mt-5">
          <h3 className="text-gray-900 text-[16px] font-bold mb-3">What's included</h3>
          <div className="flex flex-col gap-3">
            {guide.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: '#d1fae5' }}
                >
                  <CheckIcon />
                </div>
                <p className="text-gray-600 text-[13px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-5" />

        {/* Reviews */}
        <div className="mt-5">
          <h3 className="text-gray-900 text-[16px] font-bold mb-3">Recent reviews</h3>
          <div className="flex flex-col gap-4">
            {guide.reviews.map((review, i) => (
              <div key={i} className="p-4 rounded-2xl" style={{ background: '#FAF7F2' }}>
                {/* Reviewer row */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                      style={{ background: 'linear-gradient(135deg, #0D7377, #14a085)' }}
                    >
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="text-gray-800 text-[13px] font-semibold leading-none">
                        {review.author} <span className="font-normal">{review.country}</span>
                      </p>
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <StarFilled key={s} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-[13px] leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom action bar — inline, scrolls with content ── */}
        <div className="mt-6 pt-5 border-t border-gray-100">
          {/* Price */}
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-gray-900 text-[22px] font-bold">{priceFormatted}</span>
            <span className="text-gray-400 text-[13px]">/ day</span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate('chat')}
              className="flex-1 py-4 rounded-2xl text-[15px] font-semibold border-2 active:opacity-75 transition-opacity"
              style={{ borderColor: '#0D7377', color: '#0D7377' }}
            >
              Chat with AI
            </button>
            <button
              onClick={() => navigate('booking')}
              className="flex-1 py-4 rounded-2xl text-[15px] font-semibold text-white active:opacity-90 transition-opacity"
              style={{
                background: 'linear-gradient(135deg, #0D7377 0%, #14a085 100%)',
                boxShadow: '0 4px 16px rgba(13,115,119,0.35)',
              }}
            >
              Book Now
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
