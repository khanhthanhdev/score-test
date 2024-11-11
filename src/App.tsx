import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginPage } from './components/LoginPage';
import { Sidebar } from './components/layout/Sidebar';
import { TeamList } from './components/teams/TeamList';
import { MatchSchedule } from './components/MatchSchedule';
import { Leaderboard } from './components/result/LeaderBoard';
import { AdminDashboard } from './components/AdminDashboard';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/teams" element={<TeamList teams={[]} />} />
                    <Route path="/matches" element={<MatchSchedule matches={[]} teams={[]} />} />
                    <Route path="/results" element={<Leaderboard teams={[]} />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;