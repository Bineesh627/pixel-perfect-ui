import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layouts
import { UserLayout } from "@/components/layout/UserLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// User Pages
import Home from "@/pages/user/Home";
import Login from "@/pages/user/Login";
import Signup from "@/pages/user/Signup";
import PredictionsList from "@/pages/user/PredictionsList";
import PredictionDetail from "@/pages/user/PredictionDetail";
import Result from "@/pages/user/Result";
import Feedback from "@/pages/user/Feedback";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import UsersManagement from "@/pages/admin/UsersManagement";
import PredictionsManagement from "@/pages/admin/PredictionsManagement";
import FeedbackManagement from "@/pages/admin/FeedbackManagement";
import ActivityLogs from "@/pages/admin/ActivityLogs";
import Settings from "@/pages/admin/Settings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/predictions" element={<PredictionsList />} />
              <Route path="/prediction/:id" element={<PredictionDetail />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/feedback/:id" element={<Feedback />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="predictions" element={<PredictionsManagement />} />
              <Route path="feedback" element={<FeedbackManagement />} />
              <Route path="logs" element={<ActivityLogs />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
