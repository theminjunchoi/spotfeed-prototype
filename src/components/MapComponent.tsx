import React, { useEffect, useRef, useState } from 'react';

interface SpotData {
  name: string;
  burstScore: number;
  lat: number;
  lng: number;
  onSpotClick: (spotName: string) => void;
}

interface MapComponentProps {
  spots: SpotData[];
  apiKey?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ spots, apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [spotPixelPositions, setSpotPixelPositions] = useState<{ x: number; y: number; spot: SpotData }[]>([]);

  useEffect(() => {
    if (!apiKey) {
      return;
    }

    // 카카오맵 API 로드 및 지도 초기화
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
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
                spot.lat,
                spot.lng
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

            // lat/lng -> 픽셀 좌표 변환 함수
            const updateSpotPixelPositions = () => {
              const projection = map.getProjection();
              const bounds = map.getBounds();
              const sw = bounds.getSouthWest();
              const ne = bounds.getNorthEast();
              const containerWidth = container.offsetWidth;
              const containerHeight = container.offsetHeight;
              const pixelPositions = spots.map((spot) => {
                const latlng = new window.kakao.maps.LatLng(spot.lat, spot.lng);
                const point = projection.pointFromCoords(latlng);
                // bounds 기준으로 상대 위치 계산
                const swPoint = projection.pointFromCoords(sw);
                const nePoint = projection.pointFromCoords(ne);
                const x = ((point.x - swPoint.x) / (nePoint.x - swPoint.x)) * containerWidth;
                const y = ((nePoint.y - point.y) / (nePoint.y - swPoint.y)) * containerHeight;
                return { x, y, spot };
              })
              // 지도 영역 내에 있는 점만 필터링
              .filter(({ x, y }) => x >= 0 && x <= containerWidth && y >= 0 && y <= containerHeight);
              setSpotPixelPositions(pixelPositions);
            };
            // 최초 렌더링
            updateSpotPixelPositions();
            // 지도 이동/확대/축소 시마다 업데이트
            window.kakao.maps.event.addListener(map, 'bounds_changed', updateSpotPixelPositions);
          }
        });
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [spots, apiKey]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-96 rounded-xl shadow-lg bg-gray-100 flex items-center justify-center">
        {!apiKey ? (
          <div className="text-gray-500 text-center">
            <div className="text-sm mb-2">카카오맵 API 키를 입력하세요</div>
            <div className="text-xs">위에서 API 키를 설정해주세요</div>
          </div>
        ) : (
          <div className="text-gray-500 text-center">
            <div className="text-sm mb-2">지도를 로드하는 중...</div>
            <div className="text-xs">잠시만 기다려주세요</div>
          </div>
        )}
      </div>
      
      {/* 실제 지도 위에 정확히 점을 찍음 */}
      <div className="absolute inset-0 pointer-events-auto">
        {spotPixelPositions.map(({ x, y, spot }, index) => (
          <div
            key={index}
            className="absolute z-20 cursor-pointer group"
            style={{
              left: x - 8, // 점의 중심이 위치하도록 보정 (w-4/2)
              top: y - 8
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
