
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin } from 'lucide-react';
import SpotInfoCard from '../components/SpotInfoCard';

const WaitTime = () => {
  const spotData = [
    {
      name: '스타벅스 강남역점',
      category: '카페',
      waitTime: '15분',
      crowdLevel: 'high' as const,
      lastUpdate: '방금 전',
      burstScore: 85,
      messages: 23,
    },
    {
      name: '교보문고 강남점',
      category: '도서/문구',
      waitTime: '없음',
      crowdLevel: 'medium' as const,
      lastUpdate: '3분 전',
      burstScore: 45,
      messages: 8,
    },
    {
      name: '신세계백화점 강남점',
      category: '쇼핑',
      waitTime: '5분',
      crowdLevel: 'low' as const,
      lastUpdate: '1분 전',
      burstScore: 72,
      messages: 15,
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">대기시간 공유</h1>
              <p className="text-sm text-gray-600">실시간 대기시간을 확인하고 공유하세요</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {spotData.map((spot, index) => (
            <SpotInfoCard 
              key={index} 
              {...spot} 
              onJoinChat={() => {}}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WaitTime;
