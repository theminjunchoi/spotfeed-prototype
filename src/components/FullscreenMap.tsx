
import React, { useState } from 'react';
import { X, Maximize, TrendingUp } from 'lucide-react';
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
  const topActiveSpots = [...spots]
    .sort((a, b) => b.messages - a.messages)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/20 transition-all duration-200 group"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Fullscreen Map */}
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

      {/* Bottom Active Spots Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
          <div className="p-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                🔥 실시간 HOT 채팅방 TOP 3
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topActiveSpots.map((spot, index) => (
                <div
                  key={spot.name}
                  onClick={() => spot.onSpotClick(spot.name)}
                  className="group bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                        index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' : 
                        'bg-gradient-to-r from-orange-400 to-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                          {spot.name.length > 18 ? `${spot.name.substring(0, 18)}...` : spot.name}
                        </h4>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full animate-pulse ${
                      spot.burstScore >= 80 ? 'bg-red-500' :
                      spot.burstScore >= 60 ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center space-x-1 text-gray-600">
                        <span>💬</span>
                        <span>{spot.messages}개 메시지</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600">
                        <span>🔥</span>
                        <span className="font-medium">{spot.burstScore}점</span>
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          spot.burstScore >= 80 ? 'bg-gradient-to-r from-red-400 to-red-600' :
                          spot.burstScore >= 60 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                          'bg-gradient-to-r from-green-400 to-green-600'
                        }`}
                        style={{ width: `${spot.burstScore}%` }}
                      ></div>
                    </div>
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
