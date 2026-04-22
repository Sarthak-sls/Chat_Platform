import React, { useState } from 'react';

const ChatApp = () => {
  // 1. State for active channel and input
  const [activeChannel, setActiveChannel] = useState('general');
  const [inputText, setInputText] = useState('');

  // 2. Mock data for the presentation
  const [messages, setMessages] = useState({
    'general': [
      { id: 1, author: 'Project Mentor', time: '10:00 AM', text: 'Let me know when the UI prototype for the 8th-semester submission is ready to view.' },
      { id: 2, author: 'Sarthak (Admin)', time: '10:05 AM', text: 'Just finishing up the channel navigation and message state now.' }
    ],
    'project-updates': [
      { id: 3, author: 'Sarthak (Admin)', time: 'Yesterday', text: 'Pushed the initial React + Tailwind setup.' },
      { id: 4, author: 'Classmate', time: 'Yesterday', text: 'Looks clean! I will start looking at the Node backend.' }
    ],
    'faculty-announcements': [
      { id: 5, author: 'HOD', time: 'Monday', text: 'Reminder: All final project abstracts must be finalized this week.' }
    ]
  });

  const channels = ['general', 'project-updates', 'faculty-announcements'];

  // 3. Handle sending a new message during the demo
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      author: 'Sarthak (Admin)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: inputText
    };

    setMessages({
      ...messages,
      [activeChannel]: [...messages[activeChannel], newMessage]
    });
    setInputText('');
  };

  return (
    // Main Container - using a specific low-glare dark palette
    <div className="flex h-screen bg-[#1e1e2e] text-[#cdd6f4] font-sans selection:bg-[#cba6f7] selection:text-[#11111b]">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-[#181825] flex flex-col border-r border-[#313244]">
        {/* Server Header */}
        <div className="h-16 flex items-center px-4 font-bold text-xl shadow-sm bg-[#11111b] text-[#cba6f7]">
          Nullclaw Node
        </div>
        
        {/* Channel List */}
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          <div className="px-2 mb-2 text-xs font-semibold text-[#a6adc8] uppercase tracking-wider">
            Text Channels
          </div>
          {channels.map((channel) => (
            <div
              key={channel}
              onClick={() => setActiveChannel(channel)}
              className={`px-3 py-2 rounded-md cursor-pointer flex items-center transition-colors duration-200 ${
                activeChannel === channel 
                  ? 'bg-[#313244] text-[#cdd6f4]' 
                  : 'text-[#a6adc8] hover:bg-[#313244] hover:text-[#cdd6f4]'
              }`}
            >
              <span className="text-xl mr-2 text-[#6c7086]">#</span>
              {channel}
            </div>
          ))}
        </div>
        
        {/* Current User Profile Area */}
        <div className="h-16 bg-[#11111b] p-3 flex items-center border-t border-[#313244]">
          <div className="w-8 h-8 rounded-full bg-[#89b4fa] flex items-center justify-center font-bold text-[#11111b] mr-3">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Sarthak</span>
            <span className="text-xs text-[#a6adc8]">Admin</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e2e]">
        
        {/* Chat Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#313244] bg-[#1e1e2e] shadow-sm">
          <span className="text-2xl text-[#6c7086] mr-2">#</span>
          <h2 className="font-bold text-lg">{activeChannel}</h2>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages[activeChannel]?.map((msg) => (
            <div key={msg.id} className="flex group">
              <div className="w-10 h-10 rounded-full bg-[#313244] flex-shrink-0 flex items-center justify-center mr-4 mt-1 font-bold text-[#a6adc8]">
                {msg.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-baseline space-x-2">
                  <span className={`font-semibold ${msg.author.includes('Sarthak') ? 'text-[#89b4fa]' : 'text-[#cba6f7]'}`}>
                    {msg.author}
                  </span>
                  <span className="text-xs text-[#6c7086]">{msg.time}</span>
                </div>
                <p className="text-[#cdd6f4] mt-1 leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-4 px-6 mb-2">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel}`}
              className="w-full bg-[#313244] text-[#cdd6f4] rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#89b4fa] placeholder-[#6c7086] transition-all"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1.5 bottom-1.5 px-3 bg-[#89b4fa] hover:bg-[#74a5f9] text-[#11111b] rounded-md font-semibold transition-colors"
            >
              Send
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ChatApp;