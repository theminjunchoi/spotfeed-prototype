
import React, { useState } from 'react';
import { X, Maximize } from 'lucide-react';
import MapComponent from './MapComponent';

interface SpotData {
  name: string;
  burstScore: number;
  lat: number;
  lng: number;
  messages: number;
  onSpotClick: (spotName: string) => void;
}

interface FullscreenMapProps {
  spots: SpotData[];
  apiKey: string;
  onMapClick?: (lat: number, lng: number) => void;
  onClose: () => void;
}

const FullscreenMap: React.FC<FullscreenMapProps> = ({ spots, apiKey, onMapClick, onClose }) => {
  // 메시지 수 기준으로 상위 3개 활발한 장소 추출
  const topActiveSpots = [...spots]
    .sort((a, b) => b.messages - a.messages)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-full h-full bg-white relative">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        {/* 전체화면 지도 */}
        <div className="w-full h-full">
          <MapComponent
            spots={spots.map(spot => ({
              name: spot.name,
              burstScore: spot.burstScore,
              lat: spot.lat,
              lng: spot.lng,
              onSpotClick: spot.onSpotClick
            }))}
            apiKey={apiKey}
            onMapClick={onMapClick}
          />
        </div>

        {/* 하단 활발한 채팅방 표시 */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
              🔥 채팅이 활발한 장소 TOP 3
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {topActiveSpots.map((spot, index) => (
                <div
                  key={spot.name}
                  onClick={() => spot.onSpotClick(spot.name)}
                  className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-all border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {spot.name.length > 15 ? `${spot.name.substring(0, 15)}...` : spot.name}
                      </span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      spot.burstScore >= 80 ? 'bg-red-500' :
                      spot.burstScore >= 60 ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>💬 {spot.messages}개 메시지</span>
                    <span>🔥 {spot.burstScore}점</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenMap;
