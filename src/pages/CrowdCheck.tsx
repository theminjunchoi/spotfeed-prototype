
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, MapPin } from 'lucide-react';

const CrowdCheck = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">혼잡도 체크</h1>
              <p className="text-sm text-gray-600">실시간 혼잡도를 확인하고 체크하세요</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">혼잡도 체크</h3>
            <p className="text-gray-600 mb-6">현재 이곳의 혼잡도를 체크해보세요</p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                여유
              </button>
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                보통
              </button>
              <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                혼잡
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CrowdCheck;
