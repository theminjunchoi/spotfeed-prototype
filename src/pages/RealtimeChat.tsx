
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, MapPin } from 'lucide-react';
import LocationChat from '../components/LocationChat';

const RealtimeChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">실시간 채팅</h1>
              <p className="text-sm text-gray-600">지금 여기 사람들과 실시간으로 소통하세요</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <LocationChat location="강남역 일대" />
      </main>
    </div>
  );
};

export default RealtimeChat;
