
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocationChat from '../components/LocationChat';
import SpotInfoCard from '../components/SpotInfoCard';
import MapComponent from '../components/MapComponent';
import FullscreenMap from '../components/FullscreenMap';
import { MapPin, MessageCircle, Users, Clock, Camera, Key, Maximize, Zap, ShoppingBag, Timer, AlertTriangle } from 'lucide-react';
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

  const popupData = [
    {
      name: '카카오프렌즈 X 라이언 한정 팝업',
      category: '캐릭터 굿즈',
      waitTime: '45분',
      crowdLevel: 'high' as const,
      lastUpdate: '방금 전',
      burstScore: 95,
      messages: 127,
      lat: 37.497942,
      lng: 127.027621,
      stockStatus: '한정 굿즈 30% 남음',
      photoZoneWait: '20분'
    },
    {
      name: '나이키 에어포스1 컬래버 스토어',
      category: '스니커즈/패션',
      waitTime: '90분',
      crowdLevel: 'high' as const,
      lastUpdate: '2분 전',
      burstScore: 88,
      messages: 89,
      lat: 37.501274,
      lng: 127.026768,
      stockStatus: '사이즈 별 재고 상이',
      photoZoneWait: '15분'
    },
    {
      name: '젠틀몬스터 신작 체험존',
      category: '선글라스/액세서리',
      waitTime: '25분',
      crowdLevel: 'medium' as const,
      lastUpdate: '5분 전',
      burstScore: 72,
      messages: 45,
      lat: 37.507794,
      lng: 127.023542,
      stockStatus: '신작 충분',
      photoZoneWait: '없음'
    },
    {
      name: 'BTS 굿즈 한정 팝업스토어',
      category: 'K-POP 굿즈',
      waitTime: '120분',
      crowdLevel: 'high' as const,
      lastUpdate: '1분 전',
      burstScore: 98,
      messages: 234,
      lat: 37.498095,
      lng: 127.028000,
      stockStatus: '⚠️ 일부 품목 품절 임박',
      photoZoneWait: '40분'
    },
    {
      name: '스타벅스 체리블라썸 MD 팝업',
      category: '카페/굿즈',
      waitTime: '15분',
      crowdLevel: 'medium' as const,
      lastUpdate: '3분 전',
      burstScore: 65,
      messages: 38,
      lat: 37.501587,
      lng: 127.025490,
      stockStatus: '시즌 MD 풍부',
      photoZoneWait: '5분'
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
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  PopBuzz
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
            팝업 스토어 현장 정보 실시간 공유
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            "지금 여기" 팝업 스토어 앞에서 줄 길이·재고·분위기 같은 정보를 실시간으로 공유하는 놀이터
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
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">대기시간 체크</p>
            </Link>
            <Link to="/photo-share" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">현장 사진</p>
            </Link>
            <Link to="/crowd-check" className="text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-gray-600">재고 알림</p>
            </Link>
          </div>
        </div>

        {/* 지도와 팝업 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 지도 섹션 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                    HOT 팝업 지도
                  </h3>
                  <button
                    onClick={() => setShowFullscreenMap(true)}
                    className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="전체화면으로 보기"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                </div>
                <MapComponent 
                  spots={popupData.map(spot => ({
                    name: spot.name,
                    burstScore: spot.burstScore,
                    lat: spot.lat,
                    lng: spot.lng,
                    onSpotClick: handleSpotClick
                  }))}
                  apiKey={kakaoApiKey}
                  onMapClick={(lat, lng) => {
                    const spotName = `새 팝업 - ${lat.toFixed(5)},${lng.toFixed(5)}`;
                    handleSpotClick(spotName);
                  }}
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-2 flex-shrink-0">
                🔥 HOT한 팝업을 클릭하여 현장 채팅에 참여하세요!
              </p>
            </div>
          </div>

          {/* 현재 위치 기반 팝업 정보 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-600" />
              실시간 팝업 현황
            </h3>
            <div className="space-y-4 max-h-[474px] overflow-y-auto pr-2">
              {popupData.map((popup, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{popup.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${
                          popup.burstScore >= 90 ? 'bg-red-500' :
                          popup.burstScore >= 70 ? 'bg-orange-500' : 'bg-green-500'
                        }`}></div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{popup.category}</p>
                      
                      {/* 재고 상태 */}
                      <div className="flex items-center space-x-1 mb-2">
                        {popup.stockStatus.includes('⚠️') ? (
                          <AlertTriangle className="w-3 h-3 text-red-500" />
                        ) : (
                          <ShoppingBag className="w-3 h-3 text-green-500" />
                        )}
                        <span className={`text-xs ${
                          popup.stockStatus.includes('⚠️') ? 'text-red-600 font-medium' : 'text-green-600'
                        }`}>
                          {popup.stockStatus}
                        </span>
                      </div>

                      {/* 대기시간 및 포토존 */}
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>대기 {popup.waitTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Camera className="w-3 h-3" />
                          <span>포토존 {popup.photoZoneWait}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">{popup.lastUpdate}</div>
                      <div className="flex items-center space-x-1 text-xs text-purple-600">
                        <MessageCircle className="w-3 h-3" />
                        <span>{popup.messages}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleJoinChat(popup.name)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    현장 채팅 참여하기
                  </button>
                </div>
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
          spots={popupData.map(spot => ({
            name: spot.name,
            burstScore: spot.burstScore,
            lat: spot.lat,
            lng: spot.lng,
            messages: spot.messages,
            onSpotClick: handleSpotClick
          }))}
          apiKey={kakaoApiKey}
          onMapClick={(lat, lng) => {
            const spotName = `새 팝업 - ${lat.toFixed(5)},${lng.toFixed(5)}`;
            handleSpotClick(spotName);
          }}
          onClose={() => setShowFullscreenMap(false)}
        />
      )}

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold">PopBuzz</h3>
          </div>
          <p className="text-gray-400 mb-4">
            팝업 스토어 현장 데이터 실시간 채팅 플랫폼
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500 mb-4">
            <span>📍 위치 기반 익명 채팅</span>
            <span>⏰ 실시간 대기시간 공유</span>
            <span>📦 재고 현황 알림</span>
            <span>📸 현장 포토존 정보</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2025 PopBuzz. 한정판 FOMO족, 줄 증오러, 인스타 인증러를 위한 팝업 정보 공유 서비스
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
