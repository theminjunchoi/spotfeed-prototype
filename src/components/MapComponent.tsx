
import React, { useEffect, useRef } from 'react';

interface SpotData {
  name: string;
  burstScore: number;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  onSpotClick: (spotName: string) => void;
}

interface MapComponentProps {
  spots: SpotData[];
}

const MapComponent: React.FC<MapComponentProps> = ({ spots }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오맵 API 로드 및 지도 초기화
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_MAP_KEY&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (mapRef.current) {
            const container = mapRef.current;
            const options = {
              center: new window.kakao.maps.LatLng(37.498095, 127.027610), // 강남역 좌표
              level: 4
            };

            const map = new window.kakao.maps.Map(container, options);

            // 마커 생성
            spots.forEach((spot) => {
              const markerPosition = new window.kakao.maps.LatLng(
                37.498095 + (Math.random() - 0.5) * 0.01,
                127.027610 + (Math.random() - 0.5) * 0.01
              );

              const marker = new window.kakao.maps.Marker({
                position: markerPosition
              });

              marker.setMap(map);

              // 마커 클릭 이벤트
              window.kakao.maps.event.addListener(marker, 'click', () => {
                spot.onSpotClick(spot.name);
              });
            });
          }
        });
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [spots]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-96 rounded-xl shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="text-sm mb-2">지도를 로드하는 중...</div>
          <div className="text-xs">카카오맵 API 키가 필요합니다</div>
        </div>
      </div>
      
      {/* 핫스팟 마커들 (fallback) */}
      <div className="absolute inset-0 pointer-events-none">
        {spots.map((spot, index) => (
          <div
            key={index}
            className="absolute z-20 cursor-pointer group pointer-events-auto"
            style={{
              top: spot.position.top,
              left: spot.position.left,
              right: spot.position.right,
              bottom: spot.position.bottom
            }}
            onClick={() => spot.onSpotClick(spot.name)}
          >
            <div className={`w-4 h-4 rounded-full animate-pulse shadow-lg transition-all duration-200 group-hover:scale-125 ${
              spot.burstScore >= 80 ? 'bg-red-500' :
              spot.burstScore >= 60 ? 'bg-orange-500' : 'bg-green-500'
            }`}>
              <div className={`absolute -top-1 -left-1 w-6 h-6 rounded-full animate-ping ${
                spot.burstScore >= 80 ? 'bg-red-300' :
                spot.burstScore >= 60 ? 'bg-orange-300' : 'bg-green-300'
              }`}></div>
            </div>
            {/* 툴팁 */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {spot.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* 범례 */}
      <div className="mt-4 flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">매우 핫함</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-gray-600">인기</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">여유</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
