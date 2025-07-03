
import React, { useState } from 'react';
import { Clock, Users, Calculator } from 'lucide-react';

interface WaitTimeEstimatorProps {
  imageUrl: string;
}

// 간단한 대기시간 추정 로직
const estimateWaitTime = (imageUrl: string): number => {
  // 실제로는 AI 비전 모델을 사용하여 사람 수를 세지만,
  // 여기서는 간단한 시뮬레이션을 위해 랜덤 값 사용
  const randomFactor = Math.random();
  const estimatedPeople = Math.floor(randomFactor * 20) + 1; // 1-20명
  
  // 사람 수에 따른 대기시간 계산 (1인당 평균 2-3분)
  const timePerPerson = 2.5;
  const baseWaitTime = estimatedPeople * timePerPerson;
  
  // 혼잡도에 따른 추가 시간
  const crowdMultiplier = estimatedPeople > 10 ? 1.5 : 1;
  
  return Math.round(baseWaitTime * crowdMultiplier);
};

const WaitTimeEstimator: React.FC<WaitTimeEstimatorProps> = ({ imageUrl }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState<number | null>(null);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // 분석 시뮬레이션 (2초 대기)
    setTimeout(() => {
      const estimatedTime = estimateWaitTime(imageUrl);
      const estimatedPeople = Math.floor(estimatedTime / 2.5);
      
      setWaitTime(estimatedTime);
      setPeopleCount(estimatedPeople);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-gray-800">대기시간 분석</span>
        </div>
        {!waitTime && (
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            {isAnalyzing ? '분석중...' : '분석하기'}
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <span>사진에서 대기줄을 분석하고 있습니다...</span>
        </div>
      )}

      {waitTime && peopleCount && (
        <div className="space-y-2">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-600" />
              <span className="text-gray-800">약 {peopleCount}명 대기</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-gray-800 font-medium">예상 {waitTime}분</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            * AI 분석 결과이며 실제 대기시간과 다를 수 있습니다
          </p>
        </div>
      )}
    </div>
  );
};

export default WaitTimeEstimator;
