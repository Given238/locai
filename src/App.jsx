import { useState, useRef } from 'react'
import Splash from './screens/Splash.jsx'
import Home from './screens/Home.jsx'
import GuideProfile from './screens/GuideProfile.jsx'
import AIChat from './screens/AIChat.jsx'
import Booking from './screens/Booking.jsx'
import Confirmation from './screens/Confirmation.jsx'

// Depth order — higher number = deeper in the flow.
// Going deeper → slide in from right. Going back → slide in from left.
const SCREEN_DEPTH = {
  splash: 0,
  home: 1,
  profile: 2,
  chat: 3,
  booking: 3,
  confirmation: 4,
}

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [transitionClass, setTransitionClass] = useState('screen-enter')
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const prevDepth = useRef(0)

  const navigate = (target, data = null) => {
    if (data) {
      if (target === 'profile') setSelectedGuide(data)
      if (target === 'confirmation') setBookingData(data)
    }

    const nextDepth = SCREEN_DEPTH[target] ?? 1
    const currentDepth = prevDepth.current
    const cls = nextDepth >= currentDepth ? 'screen-slide-right' : 'screen-slide-left'
    prevDepth.current = nextDepth

    setTransitionClass(cls)
    setScreen(target)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] min-h-[812px] relative overflow-hidden bg-white shadow-2xl">
        <div key={screen} className={transitionClass} style={{ height: '100%' }}>
          {screen === 'splash'        && <Splash navigate={navigate} />}
          {screen === 'home'          && <Home navigate={navigate} />}
          {screen === 'profile'       && <GuideProfile guide={selectedGuide} navigate={navigate} />}
          {screen === 'chat'          && <AIChat guide={selectedGuide} navigate={navigate} />}
          {screen === 'booking'       && <Booking guide={selectedGuide} navigate={navigate} />}
          {screen === 'confirmation'  && <Confirmation booking={bookingData} guide={selectedGuide} navigate={navigate} />}
        </div>
      </div>
    </div>
  )
}
