
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin } from 'lucide-react';

const PhotoShare = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* 헤더 */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">현장 사진</h1>
              <p className="text-sm text-gray-600">현재 상황을 사진으로 공유하세요</p>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="text-center py-12">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">현장 사진 공유</h3>
            <p className="text-gray-600 mb-6">지금 이곳의 상황을 사진으로 공유해보세요</p>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
              사진 업로드
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoShare;
