
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import RealtimeChat from "./pages/RealtimeChat";
import WaitTime from "./pages/WaitTime";
import PhotoShare from "./pages/PhotoShare";
import CrowdCheck from "./pages/CrowdCheck";
import ChatRoom from "./pages/ChatRoom";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/realtime-chat" element={<RealtimeChat />} />
            <Route path="/wait-time" element={<WaitTime />} />
            <Route path="/photo-share" element={<PhotoShare />} />
            <Route path="/crowd-check" element={<CrowdCheck />} />
            <Route path="/chat/:spotName" element={<ChatRoom />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
