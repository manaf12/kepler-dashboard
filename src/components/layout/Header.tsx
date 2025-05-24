import React from 'react';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = 'Jehad Alqurini' }) => {
  return (
    <header className="bg-black border-b border-gray-800 py-2 px-4 flex justify-between items-center h-16">
      {/* Left side - Logos */}
      <div className="flex items-center space-x-4 bg-[#262626] h-16">
       <div className="flex items-center">
          <img 
            src="/logo-arabic.png" 
            alt="Arabic Logo" 
            className="h-12 p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'assets/MOSAICCOLOR.png';
            }}
          />
        </div>
        <div className="flex items-center border-r-2 ">
          <img 
            src="/logo-arabic.png" 
            alt="Arabic Logo" 
            className="h-12 p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'assets/Platform_Horizontal_Transparent.png';
            }}
          />
        </div>
        <div className="flex items-center">
          <img 
            src="/logo-arabic.png" 
            alt="Arabic Logo" 
            className="h-12 p-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'assets/FOUNDATION_BLACK.png';
            }}
          />
        </div>
      </div>

      {/* Right side - User controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <div className="flex items-center bg-gray-900 rounded-full px-3 py-1">
           
            <span className="text-white text-sm">{username}</span>
            <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center bg-gray-900 rounded-full px-3 py-1">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span className="text-white text-sm ml-1">Language</span>
          <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <button className="text-gray-400 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
