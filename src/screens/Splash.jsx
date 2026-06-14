export default function Splash({ navigate }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[812px] bg-[#0D7377]">
      <p className="text-white text-2xl font-bold">LocAI</p>
      <p className="text-white/80 mt-2">Splash screen — coming soon</p>
      <button
        onClick={() => navigate('home')}
        className="mt-8 px-6 py-3 bg-white text-[#0D7377] rounded-full font-semibold"
      >
        Get Started
      </button>
    </div>
  )
}
