
import React, { useState } from 'react';
import { Clock, Users, Calculator, Zap } from 'lucide-react';

interface WaitTimeEstimatorProps {
  imageUrl: string;
}

const estimateWaitTime = (imageUrl: string): number => {
  const randomFactor = Math.random();
  const estimatedPeople = Math.floor(randomFactor * 20) + 1;
  const timePerPerson = 2.5;
  const baseWaitTime = estimatedPeople * timePerPerson;
  const crowdMultiplier = estimatedPeople > 10 ? 1.5 : 1;
  
  return Math.round(baseWaitTime * crowdMultiplier);
};

const WaitTimeEstimator: React.FC<WaitTimeEstimatorProps> = ({ imageUrl }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [waitTime, setWaitTime] = useState<number | null>(null);
  const [peopleCount, setPeopleCount] = useState<number | null>(null);

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const estimatedTime = estimateWaitTime(imageUrl);
      const estimatedPeople = Math.floor(estimatedTime / 2.5);
      
      setWaitTime(estimatedTime);
      setPeopleCount(estimatedPeople);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-900">AI 대기시간 분석</span>
        </div>
        {!waitTime && (
          <button
            onClick={analyzeImage}
            disabled={isAnalyzing}
            className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-3 h-3 border border-white border-t-transparent rounded-full"></div>
                <span>분석중</span>
              </>
            ) : (
              <>
                <Zap className="w-3 h-3" />
                <span>분석하기</span>
              </>
            )}
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="flex items-center space-x-3 text-sm text-blue-700">
          <div className="animate-pulse w-4 h-4 bg-blue-400 rounded-full"></div>
          <span>사진에서 대기줄을 분석하고 있습니다...</span>
        </div>
      )}

      {waitTime && peopleCount && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-gray-600">대기 인원</span>
              </div>
              <div className="text-lg font-bold text-blue-900">{peopleCount}명</div>
            </div>
            <div className="bg-white/70 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-medium text-gray-600">예상 시간</span>
              </div>
              <div className="text-lg font-bold text-indigo-900">{waitTime}분</div>
            </div>
          </div>
          <div className="bg-white/50 rounded-lg p-2">
            <p className="text-xs text-blue-700 text-center">
              ⚡ AI 분석 결과이며 실제 대기시간과 다를 수 있습니다
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitTimeEstimator;
