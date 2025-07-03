
import React, { useState } from 'react';
import { MessageCircle, Clock, Camera, Users, MapPin, Maximize, Settings, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import FullscreenMap from '../components/FullscreenMap';
import PersonaSection from '../components/PersonaSection';

const Index = () => {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [showFullscreenMap, setShowFullscreenMap] = useState(false);

  // 샘플 데이터
  const spots = [
    {
      name: '강남역 스타벅스',
      burstScore: 85,
      lat: 37.498095,
      lng: 127.027610,
      messages: 124,
      onSpotClick: (spotName: string) => navigate(`/chat/${encodeURIComponent(spotName)}`)
    },
    {
      name: '홍대입구 맥도날드',
      burstScore: 72,
      lat: 37.556514,
      lng: 126.922595,
      messages: 89,
      onSpotClick: (spotName: string) => navigate(`/chat/${encodeURIComponent(spotName)}`)
    },
    {
      name: '명동 롯데백화점',
      burstScore: 65,
      lat: 37.563692,
      lng: 126.982812,
      messages: 67,
      onSpotClick: (spotName: string) => navigate(`/chat/${encodeURIComponent(spotName)}`)
    },
    {
      name: '이태원 클럽',
      burstScore: 91,
      lat: 37.534565,
      lng: 126.994734,
      messages: 156,
      onSpotClick: (spotName: string) => navigate(`/chat/${encodeURIComponent(spotName)}`)
    },
    {
      name: '잠실 롯데월드타워',
      burstScore: 58,
      lat: 37.513056,
      lng: 127.100278,
      messages: 43,
      onSpotClick: (spotName: string) => navigate(`/chat/${encodeURIComponent(spotName)}`)
    }
  ];

  const handleMapClick = (lat: number, lng: number) => {
    console.log(`Map clicked at: ${lat}, ${lng}`);
  };

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: '실시간 채팅',
      description: '장소별 실시간 소통',
      path: '/realtime-chat',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '대기시간 확인',
      description: 'AI 기반 대기시간 예측',
      path: '/wait-time',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: '사진 공유',
      description: '현장 상황 실시간 공유',
      path: '/photo-share',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: '혼잡도 체크',
      description: '실시간 혼잡도 확인',
      path: '/crowd-check',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SpotFeed</h1>
                <p className="text-xs text-gray-500">실시간 장소 정보 플랫폼</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Key className="w-4 h-4 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="카카오맵 API 키"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-transparent text-sm border-none outline-none placeholder-gray-400 w-40"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            실시간으로 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">연결되는</span> 장소들
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI와 실시간 데이터로 더 스마트한 장소 선택을 경험하세요
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">실시간 장소 지도</h3>
                  <p className="text-sm text-gray-500 mt-1">장소를 클릭하여 채팅방에 참여하거나 지도를 클릭해 새로운 채팅방을 만들어보세요</p>
                </div>
                <button
                  onClick={() => setShowFullscreenMap(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Maximize className="w-4 h-4" />
                  <span className="text-sm font-medium">전체화면</span>
                </button>
              </div>
            </div>
            <div className="h-96">
              <MapComponent
                spots={spots}
                apiKey={apiKey}
                onMapClick={handleMapClick}
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">주요 기능</h3>
            <p className="text-gray-600">다양한 방법으로 실시간 장소 정보를 확인하세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-200/50 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1,234</div>
                <div className="text-sm text-gray-600">활성 채팅방</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5,678</div>
                <div className="text-sm text-gray-600">실시간 사용자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">890</div>
                <div className="text-sm text-gray-600">오늘 공유된 사진</div>
              </div>
            </div>
          </div>
        </div>

        {/* Persona Section */}
        <PersonaSection />
      </div>

      {/* Fullscreen Map */}
      {showFullscreenMap && (
        <FullscreenMap
          spots={spots}
          apiKey={apiKey}
          onMapClick={handleMapClick}
          onClose={() => setShowFullscreenMap(false)}
        />
      )}
    </div>
  );
};

export default Index;
