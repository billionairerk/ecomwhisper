
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import KeywordRankings from '@/components/dashboard/KeywordRankings';
import ContentMonitor from '@/components/dashboard/ContentMonitor';
import Backlinks from '@/components/dashboard/Backlinks';
import Competitors from '@/components/dashboard/Competitors';
import GrowthHacks from '@/components/dashboard/GrowthHacks';
import Settings from '@/components/dashboard/Settings';
import Help from '@/components/dashboard/Help';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/keywords" element={<KeywordRankings />} />
        <Route path="/content" element={<ContentMonitor />} />
        <Route path="/backlinks" element={<Backlinks />} />
        <Route path="/competitors" element={<Competitors />} />
        <Route path="/growth" element={<GrowthHacks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;
