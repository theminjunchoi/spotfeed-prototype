
import React, { useState } from 'react';
import { MoreVertical, Flag, ThumbsUp, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import WaitTimeEstimator from './WaitTimeEstimator';

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
  const { reportUser, recommendUser, currentUser } = useUser();

  const handleReport = () => {
    const targetUserId = `user_${user}_${id}`;
    reportUser(targetUserId);
    setIsReported(true);
    setShowActions(false);
  };

  const handleRecommend = () => {
    const targetUserId = `user_${user}_${id}`;
    recommendUser(targetUserId);
    setIsRecommended(true);
    setShowActions(false);
  };

  const isOwnMessage = user.includes('익명') && user.includes(currentUser.userId.split('_')[1]);

  // 대기줄 관련 키워드 검색
  const waitTimeKeywords = ['대기', '줄', '웨이팅', '기다림', '대기시간', '웨이팅시간'];
  const shouldShowWaitTimeEstimator = type === 'image' && waitTimeKeywords.some(keyword => 
    message.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="group hover:bg-gray-50/50 rounded-lg transition-colors duration-200">
      <div className="flex items-start space-x-3 p-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-sm">
          {avatar}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-gray-900 text-sm">{user}</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{time}</span>
            </div>
            {isReported && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                신고됨
              </span>
            )}
            {isRecommended && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                추천됨
              </span>
            )}
          </div>
          
          {type === 'text' ? (
            <p className="text-gray-800 text-sm leading-relaxed">{message}</p>
          ) : (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img 
                  src={imageUrl} 
                  alt="shared content" 
                  className="max-w-sm rounded-lg shadow-sm border border-gray-200"
                />
              </div>
              {message && message !== '사진을 공유했습니다' && (
                <p className="text-gray-800 text-sm leading-relaxed">{message}</p>
              )}
              
              {/* 대기시간 추정기 */}
              {shouldShowWaitTimeEstimator && imageUrl && (
                <WaitTimeEstimator imageUrl={imageUrl} />
              )}
            </div>
          )}
        </div>

        {/* Action Button */}
        {!isOwnMessage && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative flex-shrink-0">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            >
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>

            {showActions && (
              <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20 min-w-32">
                <button
                  onClick={handleRecommend}
                  disabled={isRecommended}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ThumbsUp className="w-4 h-4 text-blue-500" />
                  <span>{isRecommended ? '추천됨' : '추천'}</span>
                </button>
                <button
                  onClick={handleReport}
                  disabled={isReported}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Flag className="w-4 h-4" />
                  <span>{isReported ? '신고됨' : '신고'}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
