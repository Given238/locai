export default function Splash({ navigate }) {
  return (
    <div className="relative flex flex-col w-full h-full min-h-[812px] overflow-hidden">

      {/* ── Hero background: dawn over Lake Toba ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0f1f3d 0%, #1a3a5c 25%, #2e6a8a 45%, #c8794a 58%, #e8a87c 65%, #0D7377 80%, #0a4a52 100%)',
        }}
      />

      {/* Subtle haze band at horizon */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '52%',
          height: '80px',
          background:
            'linear-gradient(180deg, transparent, rgba(232,168,124,0.18) 40%, transparent)',
        }}
      />

      {/* Mountain + lake SVG scene */}
      <div className="absolute bottom-0 left-0 right-0" style={{ top: '42%' }}>
        <svg
          viewBox="0 0 375 460"
          className="w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Far mountains (lighter, misty) */}
          <path
            d="M0 180 L45 110 L90 145 L140 75 L190 120 L240 85 L295 125 L340 90 L375 115 L375 200 L0 200Z"
            fill="#1a3d52"
            fillOpacity="0.7"
          />
          {/* Main mountain range */}
          <path
            d="M0 210 L35 140 L75 165 L120 100 L170 148 L215 110 L265 155 L310 118 L355 150 L375 135 L375 240 L0 240Z"
            fill="#112d40"
          />
          {/* Foreground hills */}
          <path
            d="M0 260 L30 230 L70 248 L110 220 L155 242 L200 228 L248 250 L295 232 L340 252 L375 238 L375 290 L0 290Z"
            fill="#0a2233"
          />
          {/* Lake surface — calm water */}
          <rect x="0" y="285" width="375" height="175" fill="#0D7377" fillOpacity="0.55" />
          {/* Reflection shimmer lines */}
          <line x1="0" y1="310" x2="375" y2="310" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <line x1="0" y1="330" x2="375" y2="330" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          <line x1="0" y1="350" x2="375" y2="350" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          {/* Mountain reflections in lake (blurry inverted) */}
          <path
            d="M0 290 L35 340 L75 318 L120 370 L170 325 L215 358 L265 318 L310 345 L355 322 L375 335 L375 460 L0 460Z"
            fill="#0a3d52"
            fillOpacity="0.35"
          />
          {/* Sunrise glow on water */}
          <ellipse cx="188" cy="295" rx="80" ry="12" fill="rgba(200,121,74,0.15)" />
        </svg>
      </div>

      {/* Bottom dark gradient overlay */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '55%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(5,15,25,0.65) 45%, rgba(5,12,22,0.92) 100%)',
        }}
      />

      {/* ── UI Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full min-h-[812px] px-6 py-12">

        {/* Top: location pill */}
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/85 text-xs font-medium tracking-wide">
            Lake Toba, North Sumatra
          </span>
        </div>

        {/* Center: logo + wordmark + tagline */}
        <div className="flex flex-col items-center gap-5">
          {/* Logo mark */}
          <div
            className="w-[72px] h-[72px] rounded-[22px] flex items-center justify-center shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #0D7377 0%, #14a085 100%)',
              boxShadow: '0 8px 32px rgba(13,115,119,0.5)',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Location pin stylised */}
              <circle cx="20" cy="17" r="7" stroke="white" strokeWidth="2" fill="none" />
              <circle cx="20" cy="17" r="2.5" fill="white" />
              <path d="M20 24 L20 34" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M14 34 L26 34" stroke="white" strokeWidth="2" strokeLinecap="round" />
              {/* AI sparkle */}
              <path d="M29 8 L30.5 11 L34 8 L30.5 5 Z" fill="white" fillOpacity="0.7" />
              <circle cx="29" cy="8" r="1" fill="white" fillOpacity="0.4" />
            </svg>
          </div>

          {/* Wordmark */}
          <div className="text-center">
            <h1
              className="text-[64px] font-bold text-white leading-none tracking-tight"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
            >
              LocAI
            </h1>
            <p className="text-white/65 text-[17px] mt-3 font-light tracking-wide">
              Find a trusted local guide
            </p>
          </div>
        </div>

        {/* Bottom: CTA + trust line */}
        <div className="w-full flex flex-col items-center gap-4">
          {/* Trust chips */}
          <div className="flex items-center gap-3">
            {['Verified guides', 'Local knowledge', 'Safe booking'].map((label) => (
              <span
                key={label}
                className="text-white/50 text-[11px] font-medium"
              >
                {label}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => navigate('home')}
            className="w-full py-[18px] rounded-2xl font-semibold text-[17px] text-white active:scale-[0.97] transition-transform duration-150 shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #0D7377 0%, #14a085 100%)',
              boxShadow: '0 8px 24px rgba(13,115,119,0.45)',
            }}
          >
            Get Started
          </button>
        </div>

      </div>
    </div>
  )
}
