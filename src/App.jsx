import { useState } from 'react'
import Splash from './screens/Splash.jsx'
import Home from './screens/Home.jsx'
import GuideProfile from './screens/GuideProfile.jsx'
import AIChat from './screens/AIChat.jsx'
import Booking from './screens/Booking.jsx'
import Confirmation from './screens/Confirmation.jsx'

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [selectedGuide, setSelectedGuide] = useState(null)
  const [bookingData, setBookingData] = useState(null)

  const navigate = (target, data = null) => {
    if (data) {
      if (target === 'profile') setSelectedGuide(data)
      if (target === 'confirmation') setBookingData(data)
    }
    setScreen(target)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] min-h-[812px] relative overflow-hidden bg-white shadow-2xl">
        {screen === 'splash' && <Splash navigate={navigate} />}
        {screen === 'home' && <Home navigate={navigate} />}
        {screen === 'profile' && <GuideProfile guide={selectedGuide} navigate={navigate} />}
        {screen === 'chat' && <AIChat guide={selectedGuide} navigate={navigate} />}
        {screen === 'booking' && <Booking guide={selectedGuide} navigate={navigate} />}
        {screen === 'confirmation' && <Confirmation booking={bookingData} guide={selectedGuide} navigate={navigate} />}
      </div>
    </div>
  )
}
