
import React from 'react';

interface ChatMessageProps {
  id: number;
  user: string;
  message: string;
  time: string;
  type: 'text' | 'image';
  avatar: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  user,
  message,
  time,
  type,
  avatar
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-white/50 rounded-lg transition-colors">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-900 text-sm">{user}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        {type === 'text' ? (
          <p className="text-gray-700 text-sm leading-relaxed break-words">
            {message}
          </p>
        ) : (
          <div className="bg-gray-200 rounded-lg p-2 text-sm text-gray-600">
            📷 이미지가 공유되었습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
