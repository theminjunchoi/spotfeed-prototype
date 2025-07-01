
import React from 'react';
import { Clock, Users, MessageCircle, TrendingUp } from 'lucide-react';

interface SpotInfoCardProps {
  name: string;
  category: string;
  waitTime: string;
  crowdLevel: 'low' | 'medium' | 'high';
  lastUpdate: string;
  burstScore: number;
  messages: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  onJoinChat?: () => void;
}

const SpotInfoCard: React.FC<SpotInfoCardProps> = ({
  name,
  category,
  waitTime,
  crowdLevel,
  lastUpdate,
  burstScore,
  messages,
  onJoinChat
}) => {
  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-50 border-green-200';
      case 'medium': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getCrowdText = (level: string) => {
    switch (level) {
      case 'low': return '여유';
      case 'medium': return '보통';
      case 'high': return '혼잡';
      default: return '정보없음';
    }
  };

  const getBurstScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-700 bg-red-50 border-red-200';
    if (score >= 60) return 'text-orange-700 bg-orange-50 border-orange-200';
    if (score >= 40) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 truncate">
              {name}
            </h4>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <div className={`px-2 py-1 rounded-md text-xs font-medium border ${getBurstScoreColor(burstScore)}`}>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{burstScore}</span>
            </div>
          </div>
        </div>

        {/* 정보 그리드 */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* 대기시간 */}
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-500 mb-1">대기시간</div>
            <div className="text-sm font-medium text-gray-900">{waitTime}</div>
          </div>

          {/* 혼잡도 */}
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-500 mb-1">혼잡도</div>
            <div className={`text-xs font-medium px-2 py-1 rounded-md border ${getCrowdColor(crowdLevel)}`}>
              {getCrowdText(crowdLevel)}
            </div>
          </div>

          {/* 채팅 수 */}
          <div className="text-center">
            <div className="flex justify-center mb-1">
              <MessageCircle className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xs text-gray-500 mb-1">대화</div>
            <div className="text-sm font-medium text-gray-900">{messages}개</div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">업데이트: {lastUpdate}</span>
          <button 
            onClick={onJoinChat}
            className="px-3 py-1 bg-purple-600 text-white text-xs rounded-md hover:bg-purple-700 transition-colors"
          >
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotInfoCard;
