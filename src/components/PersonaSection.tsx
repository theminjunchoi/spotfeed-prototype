
import React from 'react';
import { User, Target, Heart, Briefcase } from 'lucide-react';

const PersonaSection: React.FC = () => {
  const personas = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: '유행에 민감한 사람 (FOMO족)',
      name: '김민수, 21세',
      description: '콘서트, 굿즈, 한정 메뉴 놓치면 멘붕',
      needs: ['소진 예상 시각 카운트다운', 'Burst Score 상위 5곳 실시간 푸시', '30초 라이브/GIF로 현장 확인'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: '줄·대기 지옥 헤이터',
      name: '박지훈, 29세',
      description: '맛집, 런치, 놀이공원 줄길이 극혐러',
      needs: ['현재 대기 팀·예상 대기 N분', '위치 기반 Q&A', '실시간 혼잡도 체크'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <User className="w-6 h-6" />,
      title: '캠퍼스, 카페 공부족',
      name: '최서연, 22세',
      description: '도서관·학식 자리 싸움하는 대학생',
      needs: ['좌석 정보', '동아리·수업 후기 Q&A', '조용한 공간 찾기'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: '소상공인',
      name: '신영철, 38세',
      description: '전화폭탄·리뷰 관리 싫은 사장',
      needs: ['FAQ 매크로', '재고/대기 자동 안내', '고객 소통 간소화'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          SpotFeed 사용자 페르소나
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          다양한 사용자들의 니즈를 분석하여 최적화된 서비스를 제공합니다
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {personas.map((persona, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${persona.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                {persona.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-gray-900 mb-1">
                  {persona.title}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {persona.name}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {persona.description}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    주요 니즈
                  </p>
                  {persona.needs.map((need, needIndex) => (
                    <div key={needIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{need}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
          <h4 className="font-bold text-lg text-gray-900 mb-2">
            사용자 중심 설계
          </h4>
          <p className="text-gray-600 mb-4">
            각 페르소나의 Pain Point를 해결하고 니즈를 만족시키는 기능들을 통해<br />
            모든 사용자가 만족할 수 있는 서비스를 제공합니다
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>FOMO족</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>대기 헤이터</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>공부족</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>소상공인</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaSection;
