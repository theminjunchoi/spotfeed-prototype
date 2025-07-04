import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import WaitTimeEstimator from './WaitTimeEstimator';
import { Send, Image, MapPin, X, AlertTriangle, Star, Clock, ShoppingBag, Camera, TrendingUp } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface LocationChatProps {
  location: string;
  onClose?: () => void;
}

// 각 장소별 팝업 정보 데이터
const getPopupInfo = (location: string) => {
  const popupInfoData: { [key: string]: any } = {
    '카카오프렌즈 X 라이언 한정 팝업': {
      waitTime: '45분',
      crowdLevel: 'high',
      stockStatus: '한정 굿즈 30% 남음',
      photoZoneWait: '20분',
      burstScore: 95,
      category: '캐릭터 굿즈'
    },
    '나이키 에어포스1 컬래버 스토어': {
      waitTime: '90분',
      crowdLevel: 'high',
      stockStatus: '사이즈 별 재고 상이',
      photoZoneWait: '15분',
      burstScore: 88,
      category: '스니커즈/패션'
    },
    '젠틀몬스터 신작 체험존': {
      waitTime: '25분',
      crowdLevel: 'medium',
      stockStatus: '신작 충분',
      photoZoneWait: '없음',
      burstScore: 72,
      category: '선글라스/액세서리'
    },
    'BTS 굿즈 한정 팝업스토어': {
      waitTime: '120분',
      crowdLevel: 'high',
      stockStatus: '⚠️ 일부 품목 품절 임박',
      photoZoneWait: '40분',
      burstScore: 98,
      category: 'K-POP 굿즈'
    },
    '스타벅스 체리블라썸 MD 팝업': {
      waitTime: '15분',
      crowdLevel: 'medium',
      stockStatus: '시즌 MD 풍부',
      photoZoneWait: '5분',
      burstScore: 65,
      category: '카페/굿즈'
    }
  };

  return popupInfoData[location] || {
    waitTime: '정보 없음',
    crowdLevel: 'medium',
    stockStatus: '재고 정보 없음',
    photoZoneWait: '정보 없음',
    burstScore: 50,
    category: '일반'
  };
};

// 각 장소별 초기 메시지 데이터
const getLocationMessages = (location: string) => {
  const locationMessages: { [key: string]: any[] } = {
    '스타벅스 강남역점': [
      {
        id: 1,
        user: '김민수',
        message: '여기 굿즈 아직 남아있나요?',
        time: '방금 전',
        type: 'text' as const,
        avatar: '🙋‍♂️'
      },
      {
        id: 2,
        user: '박지훈',
        message: '네, 방금 확인했는데 3종류 정도 남았어요!',
        time: '1분 전',
        type: 'text' as const,
        avatar: '👨‍💻'
      }
    ],
    '교보문고 강남점': [
      {
        id: 1,
        user: '최서연',
        message: '신간 도서 할인 행사 언제까지인가요?',
        time: '방금 전',
        type: 'text' as const,
        avatar: '👩‍🎓'
      },
      {
        id: 2,
        user: '신영철',
        message: '이번 주말까지 20% 할인이에요',
        time: '2분 전',
        type: 'text' as const,
        avatar: '👨‍🍳'
      }
    ],
    '신세계백화점 강남점': [
      {
        id: 1,
        user: '이주영',
        message: '지하 식품관 시식 코너 운영하나요?',
        time: '방금 전',
        type: 'text' as const,
        avatar: '🧑‍🎨'
      },
      {
        id: 2,
        user: '김태현',
        message: '네, 지금 운영 중이에요!',
        time: '1분 전',
        type: 'text' as const,
        avatar: '👨‍🏫'
      }
    ],
    '맥도날드 강남점': [
      {
        id: 1,
        user: '박수진',
        message: '키오스크 고장났나요? 주문이 안 돼요',
        time: '방금 전',
        type: 'text' as const,
        avatar: '👩‍💼'
      },
      {
        id: 2,
        user: '조민호',
        message: '직원분께 말씀드리면 수동으로 해주세요',
        time: '2분 전',
        type: 'text' as const,
        avatar: '👨‍🔧'
      }
    ],
    'CGV 강남점': [
      {
        id: 1,
        user: '한지원',
        message: '팝콘 콤보 할인 있나요?',
        time: '방금 전',
        type: 'text' as const,
        avatar: '👩‍🦰'
      },
      {
        id: 2,
        user: '윤성민',
        message: '평일 오후 2시 전까지 30% 할인이요',
        time: '3분 전',
        type: 'text' as const,
        avatar: '👨‍🦱'
      }
    ]
  };

  return locationMessages[location] || [
    {
      id: 1,
      user: '익명사용자',
      message: '이곳은 어떤가요?',
      time: '방금 전',
      type: 'text' as const,
      avatar: '🙋‍♂️'
    }
  ];
};

const LocationChat: React.FC<LocationChatProps> = ({ location, onClose }) => {
  const { currentUser, canUserChat } = useUser();
  const [messages, setMessages] = useState(() => getLocationMessages(location));
  const [newMessage, setNewMessage] = useState('');
  const [userName] = useState('익명' + Math.floor(Math.random() * 1000));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const popupInfo = getPopupInfo(location);

  // 장소별 가짜 실시간 메시지 시뮬레이션
  useEffect(() => {
    const locationFakeMessages: { [key: string]: string[] } = {
      '스타벅스 강남역점': [
        '줄이 조금 줄어들었네요!',
        '재고 거의 떨어져가요 ㅠㅠ',
        '직원분들 친절해요 👍',
        '와이파이 빨라요!',
        '테이블 자리 있어요'
      ],
      '교보문고 강남점': [
        '신간 코너 업데이트 됐어요',
        '카페 자리 많아요',
        '조용해서 공부하기 좋네요',
        '베스트셀러 진열 새로 바뀜',
        '문구 코너 할인 중'
      ],
      '신세계백화점 강남점': [
        '분위기 정말 좋아요!',
        '사진 찍기 좋은 포토존 있어요',
        '엘리베이터 대기시간 긴편',
        '지하 식품관 추천!',
        '주차장 여유있어요'
      ],
      '맥도날드 강남점': [
        '드라이브스루 빨라요',
        '매장 깨끗해요',
        '키즈존 있어서 좋네요',
        '아이스크림 기계 정상 작동중',
        '배달 주문 많아서 좀 바빠요'
      ],
      'CGV 강남점': [
        '예매 취소표 나왔어요!',
        '팝콘 신메뉴 맛있어요',
        '상영관 음향 좋네요',
        '주차 할인 받으세요',
        '매점 줄 짧아요'
      ]
    };

    const fakeMessages = locationFakeMessages[location] || [
      '현장 상황 괜찮아요',
      '분위기 좋네요',
      '추천해요!',
      '여기 처음인데 좋은 것 같아요',
      '친절하네요'
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        const newMsg = {
          id: Date.now(),
          user: '익명' + Math.floor(Math.random() * 1000),
          message: randomMessage,
          time: '방금 전',
          type: 'text' as const,
          avatar: ['🙋‍♂️', '👨‍💻', '👩‍🎓', '👨‍🍳', '🧑‍🎨', '👩‍💼', '👨‍🔧', '👩‍🦰', '👨‍🦱'][Math.floor(Math.random() * 9)]
        };
        setMessages(prev => [...prev, newMsg]);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [location]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!canUserChat()) {
      alert('채팅 정지 상태입니다. 정지 해제 후 이용해주세요.');
      return;
    }

    if (newMessage.trim() || selectedImage) {
      const message = {
        id: Date.now(),
        user: userName,
        message: newMessage || '사진을 공유했습니다',
        time: '방금 전',
        type: selectedImage ? 'image' as const : 'text' as const,
        avatar: '🙋‍♂️',
        imageUrl: imagePreview || undefined
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
      setSelectedImage(null);
      setImagePreview(null);
      
      // 타이핑 애니메이션
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCrowdColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-700 bg-green-50';
      case 'medium': return 'text-orange-700 bg-orange-50';
      case 'high': return 'text-red-700 bg-red-50';
      default: return 'text-gray-700 bg-gray-50';
    }
  };

  const getCrowdText = (level: string) => {
    switch (level) {
      case 'low': return '여유';
      case 'medium': return '보통';
      case 'high': return '혼잡';
      default: return '정보없음';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* 채팅 헤더 */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg">실시간 채팅</h3>
              <p className="text-sm text-purple-100">{location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* 사용자 상태 표시 */}
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm">Lv.{currentUser.friendlinessLevel}</span>
                </div>
                {currentUser.isSuspended && (
                  <div className="flex items-center space-x-1 bg-red-500/20 px-2 py-1 rounded">
                    <AlertTriangle className="w-3 h-3 text-red-300" />
                    <span className="text-xs">정지</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">실시간</span>
              </div>
              <p className="text-xs text-purple-100">
                {messages.length}개 메시지
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 팝업 정보 패널 */}
      <div className="bg-gray-50 border-b border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
            현장 정보
          </h4>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              popupInfo.burstScore >= 90 ? 'bg-red-500' :
              popupInfo.burstScore >= 70 ? 'bg-orange-500' : 'bg-green-500'
            }`}></div>
            <span className="text-sm text-gray-600">HOT {popupInfo.burstScore}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* 대기시간 */}
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mb-1">대기시간</p>
            <p className="text-sm font-medium text-gray-900">{popupInfo.waitTime}</p>
          </div>

          {/* 혼잡도 */}
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="flex justify-center mb-2">
              <div className={`w-4 h-4 rounded-full ${getCrowdColor(popupInfo.crowdLevel)}`}></div>
            </div>
            <p className="text-xs text-gray-500 mb-1">혼잡도</p>
            <p className="text-sm font-medium text-gray-900">{getCrowdText(popupInfo.crowdLevel)}</p>
          </div>
        </div>

        <div className="space-y-2">
          {/* 재고 상태 */}
          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2">
            {popupInfo.stockStatus.includes('⚠️') ? (
              <AlertTriangle className="w-4 h-4 text-red-500" />
            ) : (
              <ShoppingBag className="w-4 h-4 text-green-500" />
            )}
            <div>
              <p className="text-xs text-gray-500">재고 현황</p>
              <p className={`text-sm font-medium ${
                popupInfo.stockStatus.includes('⚠️') ? 'text-red-600' : 'text-green-600'
              }`}>
                {popupInfo.stockStatus}
              </p>
            </div>
          </div>

          {/* 포토존 정보 */}
          <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2">
            <Camera className="w-4 h-4 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">포토존 대기</p>
              <p className="text-sm font-medium text-gray-900">{popupInfo.photoZoneWait}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id}>
              <ChatMessage {...msg} />
              {msg.type === 'image' && msg.imageUrl && (
                <WaitTimeEstimator imageUrl={msg.imageUrl} />
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm">누군가 입력 중...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 메시지 입력 영역 */}
      <div className="p-4 bg-white border-t border-gray-100">
        {currentUser.isSuspended && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>채팅이 일시 정지되었습니다. {currentUser.suspendedUntil?.toLocaleString()}까지 정지됩니다.</span>
          </div>
        )}
        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className="mb-3 relative">
            <img src={imagePreview} alt="미리보기" className="max-w-32 max-h-32 rounded-lg" />
            <button
              onClick={() => {
                setSelectedImage(null);
                setImagePreview(null);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            disabled={!canUserChat()}
          >
            <Image className="w-5 h-5" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={canUserChat() ? "현장 정보를 공유해보세요..." : "채팅이 정지되었습니다"}
              disabled={!canUserChat()}
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={(!newMessage.trim() && !selectedImage) || !canUserChat()}
            className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          현재 위치: {location} • 익명 채팅 • Lv.{currentUser.friendlinessLevel}
        </p>
      </div>
    </div>
  );
};

export default LocationChat;
