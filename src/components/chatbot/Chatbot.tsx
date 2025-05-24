import React, { useState } from 'react';

interface ChatbotProps {
  className?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className={`${className} ${isOpen ? 'w-80 bg-[#262626] border-r border-gray-800' : 'w-0'} transition-all duration-300 h-full flex flex-col`}>
      {isOpen && (
        <>
          <div className="flex items-center justify-between p-3 border-b border-gray-800">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-white font-medium">Chatbot</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="mb-4">
              <div className="text-gray-400 mb-1 text-sm">Chatbot</div>
              <div className="bg-gray-800 rounded-lg p-3 text-white">
                Hey there! I need to know more about your needs. What is available?
              </div>
            </div>

            <div className="mb-4">
              <div className="text-right text-gray-400 mb-1 text-sm">You</div>
              <div className="bg-cyan-900 rounded-lg p-3 text-white">
                I'm looking for information about medical facilities in this region.
              </div>
            </div>

            <div className="mb-4">
              <div className="text-gray-400 mb-1 text-sm">Chatbot</div>
              <div className="bg-gray-800 rounded-lg p-3 text-white">
                I can help with that. The selected region has 5 medical buildings including 2 hospitals and 3 clinics. Would you like more specific information about equipment or capacity?
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-gray-800">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Chatbot..."
                className="w-full bg-gray-800 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-3"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
