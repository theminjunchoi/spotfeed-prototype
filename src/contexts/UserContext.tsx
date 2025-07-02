
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserState {
  userId: string;
  friendlinessLevel: number;
  reportCount: number;
  isSuspended: boolean;
  suspendedUntil?: Date;
}

interface UserAction {
  type: 'REPORT' | 'RECOMMEND';
  targetUserId: string;
  fromUserId: string;
}

interface UserContextType {
  currentUser: UserState;
  reportUser: (targetUserId: string) => void;
  recommendUser: (targetUserId: string) => void;
  canUserChat: () => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserState>({
    userId: 'user_' + Math.random().toString(36).substr(2, 9),
    friendlinessLevel: 1,
    reportCount: 0,
    isSuspended: false
  });

  const [userReports, setUserReports] = useState<Map<string, Set<string>>>(new Map());
  const [userRecommendations, setUserRecommendations] = useState<Map<string, Set<string>>>(new Map());

  useEffect(() => {
    // 정지 해제 체크
    if (currentUser.isSuspended && currentUser.suspendedUntil) {
      const now = new Date();
      if (now > currentUser.suspendedUntil) {
        setCurrentUser(prev => ({
          ...prev,
          isSuspended: false,
          suspendedUntil: undefined
        }));
      }
    }
  }, [currentUser.isSuspended, currentUser.suspendedUntil]);

  const reportUser = (targetUserId: string) => {
    if (targetUserId === currentUser.userId) return;

    const reports = userReports.get(targetUserId) || new Set();
    reports.add(currentUser.userId);
    setUserReports(new Map(userReports.set(targetUserId, reports)));

    if (reports.size >= 5) {
      // 하루 정지
      const suspendedUntil = new Date();
      suspendedUntil.setDate(suspendedUntil.getDate() + 1);
      
      // 실제로는 targetUserId에 해당하는 사용자를 정지시켜야 하지만,
      // 데모를 위해 현재 사용자가 자신을 신고하면 정지되도록 구현
      if (targetUserId.includes('current')) {
        setCurrentUser(prev => ({
          ...prev,
          isSuspended: true,
          suspendedUntil,
          reportCount: prev.reportCount + 1
        }));
      }
    }
  };

  const recommendUser = (targetUserId: string) => {
    if (targetUserId === currentUser.userId) return;

    const recommendations = userRecommendations.get(targetUserId) || new Set();
    recommendations.add(currentUser.userId);
    setUserRecommendations(new Map(userRecommendations.set(targetUserId, recommendations)));

    // 실제로는 targetUserId에 해당하는 사용자의 레벨을 올려야 하지만,
    // 데모를 위해 현재 사용자가 추천을 받으면 레벨이 올라가도록 구현
    if (targetUserId.includes('current')) {
      setCurrentUser(prev => ({
        ...prev,
        friendlinessLevel: Math.min(prev.friendlinessLevel + 1, 10)
      }));
    }
  };

  const canUserChat = () => {
    return !currentUser.isSuspended;
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      reportUser,
      recommendUser,
      canUserChat
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
