
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { Send, Image, MapPin } from 'lucide-react';

interface LocationChatProps {
  location: string;
}

const LocationChat: React.FC<LocationChatProps> = ({ location }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: '김민수',
      message: '여기 굿즈 아직 남아있나요?',
      time: '방금 전',
      type: 'text' as const,
      avatar: '🙋‍♂️'
    },
    {
      id: 2,
      user: '박지훈',
      message: '네, 방금 확인했는데 3종류 정도 남았어요!',
      time: '1분 전',
      type: 'text' as const,
      avatar: '👨‍💻'
    },
    {
      id: 3,
      user: '최서연',
      message: '줄이 얼마나 길어요?',
      time: '2분 전',
      type: 'text' as const,
      avatar: '👩‍🎓'
    },
    {
      id: 4,
      user: '신영철',
      message: '현재 약 15분 정도 대기 예상됩니다',
      time: '3분 전',
      type: 'text' as const,
      avatar: '👨‍🍳'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [userName] = useState('익명' + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 가짜 실시간 메시지 시뮬레이션
  useEffect(() => {
    const fakeMessages = [
      '줄이 조금 줄어들었네요!',
      '재고 거의 떨어져가요 ㅠㅠ',
      '분위기 정말 좋아요!',
      '사진 찍기 좋은 포토존 있어요',
      '직원분들 친절해요 👍',
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        const newMsg = {
          id: Date.now(),
          user: '익명' + Math.floor(Math.random() * 1000),
          message: randomMessage,
          time: '방금 전',
          type: 'text' as const,
          avatar: ['🙋‍♂️', '👨‍💻', '👩‍🎓', '👨‍🍳', '🧑‍🎨'][Math.floor(Math.random() * 5)]
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: userName,
        message: newMessage,
        time: '방금 전',
        type: 'text' as const,
        avatar: '🙋‍♂️'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      
      // 타이핑 애니메이션
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 채팅 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">실시간 채팅</h3>
              <p className="text-sm text-purple-100">{location}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">실시간</span>
            </div>
            <p className="text-xs text-purple-100">
              {messages.length}개 메시지
            </p>
          </div>
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} {...msg} />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">누군가 입력 중...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 메시지 입력 영역 */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <Image className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="현장 정보를 공유해보세요..."
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          현재 위치: {location} • 익명 채팅
        </p>
      </div>
    </div>
  );
};

export default LocationChat;
