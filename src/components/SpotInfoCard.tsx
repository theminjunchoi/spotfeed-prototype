
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
}

const SpotInfoCard: React.FC<SpotInfoCardProps> = ({
  name,
  category,
  waitTime,
  crowdLevel,
  lastUpdate,
  burstScore,
  messages
}) => {
  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
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
    if (score >= 80) return 'text-red-600 bg-red-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
      <div className="p-5">
        {/* 헤더 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getBurstScoreColor(burstScore)}`}>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>{burstScore}</span>
            </div>
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="space-y-3">
          {/* 대기시간 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">대기시간</span>
            </div>
            <span className="font-medium text-blue-600">{waitTime}</span>
          </div>

          {/* 혼잡도 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">혼잡도</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCrowdColor(crowdLevel)}`}>
              {getCrowdText(crowdLevel)}
            </span>
          </div>

          {/* 채팅 메시지 수 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">실시간 대화</span>
            </div>
            <span className="font-medium text-green-600">{messages}개</span>
          </div>
        </div>

        {/* 푸터 */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">업데이트: {lastUpdate}</span>
            <button className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full hover:from-purple-700 hover:to-pink-700 transition-all">
              참여하기
            </button>
          </div>
        </div>
      </div>

      {/* 호버 시 나타나는 액션 바 */}
      <div className="bg-gray-50 px-5 py-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex space-x-2">
          <button className="flex-1 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            실시간 채팅
          </button>
          <button className="flex-1 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            사진 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotInfoCard;
