
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationChat from '../components/LocationChat';
import SpotInfoCard from '../components/SpotInfoCard';
import MapComponent from '../components/MapComponent';
import FullscreenMap from '../components/FullscreenMap';
import { MapPin, MessageCircle, Users, Clock, Camera, Key, Maximize } from 'lucide-react';
import { Input } from '../components/ui/input';

const Index = () => {
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);
  const navigate = useNavigate();
  const kakaoApiKey = 'e5a12bbcf8d41db46bd201eaa8a7348b';

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
      lat: 37.497942,
      lng: 127.027621
    },
    {
      name: '교보문고 강남점',
      category: '도서/문구',
      waitTime: '없음',
      crowdLevel: 'medium' as const,
      lastUpdate: '3분 전',
      burstScore: 45,
      messages: 8,
      lat: 37.501274,
      lng: 127.026768
    },
    {
      name: '신세계백화점 강남점',
      category: '쇼핑',
      waitTime: '5분',
      crowdLevel: 'low' as const,
      lastUpdate: '1분 전',
      burstScore: 72,
      messages: 15,
      lat: 37.507794,
      lng: 127.023542
    },
    {
      name: '맥도날드 강남점',
      category: '패스트푸드',
      waitTime: '8분',
      crowdLevel: 'high' as const,
      lastUpdate: '2분 전',
      burstScore: 88,
      messages: 31,
      lat: 37.498095,
      lng: 127.028000
    },
    {
      name: 'CGV 강남점',
      category: '영화관',
      waitTime: '12분',
      crowdLevel: 'medium' as const,
      lastUpdate: '5분 전',
      burstScore: 65,
      messages: 19,
      lat: 37.501587,
      lng: 127.025490
    }
  ];

  const handleSpotClick = (spotName: string) => {
    navigate(`/chat/${encodeURIComponent(spotName)}`);
  };

  const handleJoinChat = (spotName: string) => {
    navigate(`/chat/${encodeURIComponent(spotName)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  SpotFeed
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentLocation}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isLocationEnabled ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
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
              <div className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mb-2 mx-auto transition-colors">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-700">실시간 채팅</p>
            </Link>
            <Link to="/wait-time" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center mb-2 mx-auto transition-colors">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-700">대기시간 공유</p>
            </Link>
            <Link to="/photo-share" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center mb-2 mx-auto transition-colors">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-700">현장 사진</p>
            </Link>
            <Link to="/crowd-check" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center mb-2 mx-auto transition-colors">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-700">혼잡도 체크</p>
            </Link>
          </div>
        </div>

        {/* 지도와 스팟 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 지도 섹션 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    핫플레이스 지도
                  </h3>
                  <button
                    onClick={() => setShowFullscreenMap(true)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="전체화면으로 보기"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
                <MapComponent 
                  spots={spotData.map(spot => ({
                    name: spot.name,
                    burstScore: spot.burstScore,
                    lat: spot.lat,
                    lng: spot.lng,
                    onSpotClick: handleSpotClick
                  }))}
                  apiKey={kakaoApiKey}
                  onMapClick={(lat, lng) => {
                    const spotName = `새 장소 - ${lat.toFixed(5)},${lng.toFixed(5)}`;
                    handleSpotClick(spotName);
                  }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2 flex-shrink-0">
                지도의 핫스팟을 클릭하여 채팅방에 참여하세요!
              </p>
            </div>
          </div>

          {/* 현재 위치 기반 SpotFeed */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              실시간 현장 정보
            </h3>
            <div className="space-y-4 max-h-[474px] overflow-y-auto pr-2">
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

      {/* 전체화면 지도 모달 */}
      {showFullscreenMap && (
        <FullscreenMap
          spots={spotData.map(spot => ({
            name: spot.name,
            burstScore: spot.burstScore,
            lat: spot.lat,
            lng: spot.lng,
            messages: spot.messages,
            onSpotClick: handleSpotClick
          }))}
          apiKey={kakaoApiKey}
          onMapClick={(lat, lng) => {
            const spotName = `새 장소 - ${lat.toFixed(5)},${lng.toFixed(5)}`;
            handleSpotClick(spotName);
          }}
          onClose={() => setShowFullscreenMap(false)}
        />
      )}

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
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
