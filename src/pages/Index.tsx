
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationChat from '../components/LocationChat';
import SpotInfoCard from '../components/SpotInfoCard';
import MapComponent from '../components/MapComponent';
import { MapPin, MessageCircle, Users, Clock, Camera, Key } from 'lucide-react';
import { Input } from '../components/ui/input';

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [kakaoApiKey, setKakaoApiKey] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // 위치 정보 요청
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation('강남역 2번 출구 인근');
          setIsLocationEnabled(true);
          console.log('위치 감지됨:', position.coords);
        },
        (error) => {
          console.log('위치 감지 실패:', error);
          setCurrentLocation('위치 정보 없음');
        }
      );
    }
  }, []);

  const spotData = [
    {
      name: '스타벅스 강남역점',
      category: '카페',
      waitTime: '15분',
      crowdLevel: 'high' as const,
      lastUpdate: '방금 전',
      burstScore: 85,
      messages: 23,
      position: { top: '25%', left: '33%' }
    },
    {
      name: '교보문고 강남점',
      category: '도서/문구',
      waitTime: '없음',
      crowdLevel: 'medium' as const,
      lastUpdate: '3분 전',
      burstScore: 45,
      messages: 8,
      position: { top: '67%', right: '25%' }
    },
    {
      name: '신세계백화점 강남점',
      category: '쇼핑',
      waitTime: '5분',
      crowdLevel: 'low' as const,
      lastUpdate: '1분 전',
      burstScore: 72,
      messages: 15,
      position: { bottom: '25%', left: '50%' }
    },
    {
      name: '맥도날드 강남점',
      category: '패스트푸드',
      waitTime: '8분',
      crowdLevel: 'high' as const,
      lastUpdate: '2분 전',
      burstScore: 88,
      messages: 31,
      position: { top: '45%', left: '20%' }
    },
    {
      name: 'CGV 강남점',
      category: '영화관',
      waitTime: '12분',
      crowdLevel: 'medium' as const,
      lastUpdate: '5분 전',
      burstScore: 65,
      messages: 19,
      position: { bottom: '35%', right: '30%' }
    }
  ];

  const handleSpotClick = (spotName: string) => {
    navigate(`/chat/${encodeURIComponent(spotName)}`);
  };

  const handleJoinChat = (spotName: string) => {
    navigate(`/chat/${encodeURIComponent(spotName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-x-hidden">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SpotFeed
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentLocation}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLocationEnabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className="text-sm text-gray-600">
                {isLocationEnabled ? '위치 활성화' : '위치 비활성화'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* 플랫폼 소개 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            지금 여기, 실시간 현장 정보
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            같은 장소에 있는 사람들과 줄 길이, 재고 상황, 현장 분위기를 실시간으로 공유하세요
          </p>
          
          {/* 주요 기능 아이콘 */}
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/realtime-chat" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">실시간 채팅</p>
            </Link>
            <Link to="/wait-time" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">대기시간 공유</p>
            </Link>
            <Link to="/photo-share" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">현장 사진</p>
            </Link>
            <Link to="/crowd-check" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">혼잡도 체크</p>
            </Link>
          </div>
        </div>

        {/* 카카오맵 API 키 입력 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Key className="w-5 h-5 mr-2 text-purple-600" />
            카카오맵 API 키 설정
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="kakao-api-key" className="block text-sm font-medium text-gray-700 mb-2">
                카카오맵 API 키를 입력하세요
              </label>
              <Input
                id="kakao-api-key"
                type="text"
                value={kakaoApiKey}
                onChange={(e) => setKakaoApiKey(e.target.value)}
                placeholder="카카오맵 API 키를 입력하세요"
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>API 키가 없으신가요?</span>
              <a
                href="https://developers.kakao.com/docs/latest/ko/map/common"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-800 underline"
              >
                카카오 개발자 센터에서 발급받기
              </a>
            </div>
          </div>
        </div>

        {/* 지도와 스팟 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 지도 섹션 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              핫플레이스 지도
            </h3>
            <MapComponent 
              spots={spotData.map(spot => ({
                name: spot.name,
                burstScore: spot.burstScore,
                position: spot.position,
                onSpotClick: handleSpotClick
              }))}
              apiKey={kakaoApiKey}
            />
            <p className="text-center text-sm text-gray-500 mt-2">
              지도의 핫스팟을 클릭하여 채팅방에 참여하세요!
            </p>
          </div>

          {/* 현재 위치 기반 SpotFeed */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              실시간 현장 정보
            </h3>
            <div className="space-y-4">
              {spotData.map((spot, index) => (
                <SpotInfoCard 
                  key={index} 
                  {...spot} 
                  onJoinChat={() => handleJoinChat(spot.name)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 실시간 위치 기반 채팅 */}
        <div className="mb-8">
          <LocationChat location={currentLocation} />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">SpotFeed</h3>
          </div>
          <p className="text-gray-400 mb-4">
            지금 여기, 실시간 현장 정보 공유 플랫폼
          </p>
          <p className="text-sm text-gray-500">
            © 2025 SpotFeed. 위치 기반 익명 채팅 & 현장 정보 공유 서비스
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
