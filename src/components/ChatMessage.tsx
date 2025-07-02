
import React, { useState } from 'react';
import { MoreVertical, Flag, ThumbsUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface ChatMessageProps {
  id: number;
  user: string;
  message: string;
  time: string;
  type: 'text' | 'image';
  avatar: string;
  imageUrl?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  id,
  user,
  message,
  time,
  type,
  avatar,
  imageUrl
}) => {
  const [showActions, setShowActions] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [isRecommended, setIsRecommended] = useState(false);
  const { reportUser, recommendUser } = useUser();

  const handleReport = () => {
    reportUser(`user_${user}_${id}`);
    setIsReported(true);
    setShowActions(false);
  };

  const handleRecommend = () => {
    recommendUser(`user_${user}_${id}`);
    setIsRecommended(true);
    setShowActions(false);
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg relative group">
      {/* 아바타 */}
      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
        {avatar}
      </div>
      
      {/* 메시지 내용 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <span className="font-medium text-gray-900 text-sm">{user}</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        
        {type === 'text' ? (
          <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
        ) : (
          <div className="mt-2">
            <img 
              src={imageUrl} 
              alt="shared content" 
              className="max-w-xs rounded-lg shadow-sm"
            />
            {message && (
              <p className="text-gray-700 text-sm mt-2">{message}</p>
            )}
          </div>
        )}
      </div>

      {/* 액션 버튼 */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity relative">
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </button>

        {showActions && (
          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-32">
            <button
              onClick={handleRecommend}
              disabled={isRecommended}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50"
            >
              <ThumbsUp className="w-4 h-4 text-blue-500" />
              <span>{isRecommended ? '추천됨' : '추천'}</span>
            </button>
            <button
              onClick={handleReport}
              disabled={isReported}
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600 disabled:opacity-50"
            >
              <Flag className="w-4 h-4" />
              <span>{isReported ? '신고됨' : '신고'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
