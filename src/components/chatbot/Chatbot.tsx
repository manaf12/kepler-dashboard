import { useEffect, useRef, useState } from "react";
import { getData, postData } from "../apis/baseUrl";
import { ChatbotSidebar } from "./ChatbotSidebar";

interface ChatbotProps {
  className?: string;
}

interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);


  useEffect(() => {
    const container = messagesEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      setMessages([]);
      getSessionMessages();
    }
  }, [sessionId]);

  const handleNewChat = () => {
    setMessages([]);
    setSessionId(null);
  };



  const handleSend = async () => {
    if (!message.trim()) return;
    const userMessage: ChatMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);
    const response = await postData("/chat", { message: userMessage.text, session_id: sessionId });

    if (response.success && response.data.assistant_response) {
      setErrorMessage("");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.assistant_response.content },
      ]);
    } else {
      setErrorMessage(response.error || "Could not fetch response.");
    }
    setLoading(false);
  };

  const getSessionMessages = async () => {
    if (!sessionId) return;
    setErrorMessage
    try {
      const result = await getData(`/chat-session/sessions/${sessionId}/messages-list?page=1&page_size=50`);

      if (result.success && result.data?.data?.messages) {
        const fetchedMessages = result.data.data.messages.map((m: any) => ({
          sender: m.role === "user" ? "user" : "bot",
          text: m.content,
        }));
        setMessages(fetchedMessages);
      } else {
        setErrorMessage(result.error || "Failed to fetch messages. Please try again later")
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setErrorMessage("Something went wrong please try again later.")
    }
  };


  return (
    <div
      className={`relative ${className} ${isOpen ? "w-80 bg-[#29323c] border-r border-gray-800" : "w-0"} transition-all duration-300 h-[500px] flex flex-col`} >
      {/* Sidebar */}
      <ChatbotSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} onSessionSelect={(id) => setSessionId(id)} onNewChat={handleNewChat} />

      {isOpen && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-gray-800 rounded-t-xl">
            <div className="flex items-center">
              <svg
                onClick={() => setSidebarOpen(true)}
                className="w-5 h-5 text-cyan-400 mr-2 cursor-pointer"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="text-white font-medium">Chatbot</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 relative overflow-y-auto p-3 space-y-4 custom-scrollbar"
            style={{ "--scrollbar-bg": "#29323c" } as React.CSSProperties}>

            {messages.length === 0 && !loading && (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-2xl text-gray-300 font-semibold text-center">
                  What can I help you with?
                </h2>
              </div>
            )}

            {messages.length > 0 && messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col">
                <div className={`text-sm mb-1 ${msg.sender === "user" ? "text-right text-gray-400" : "text-gray-400"}`}>
                  {msg.sender === "user" ? "You" : "Chatbot"}
                </div>
                <div className={`rounded-xl p-3 text-white ${msg.sender === "user" ? " bg-[#1FBAD6] self-end" : "bg-[#242730] self-start"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-1 text-gray-400">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              </div>
            )}
            {errorMessage && <div className="text-red-500 text-xs mt-1">{errorMessage}</div>}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-800">
            <div className="relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Chatbot..."
                className="w-full bg-[#242730] text-white rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <button onClick={handleSend} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="absolute bottom-4 left-4 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full p-3 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
