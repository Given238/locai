export default function ChatBubble({ message, isUser }) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${isUser ? 'bg-[#0D7377] text-white' : 'bg-[#F0EDEA] text-gray-800'}`}>
        {message}
      </div>
    </div>
  )
}
