import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './pages/login/LoginPage';
import UserPage from './pages/users/UsersPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import BlogPage from './pages/blogs/BlogsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import ApprovedBlogsPage from './pages/blogs/ApprovedBlogsPage';
import RejectedBlogsPage from './pages/blogs/RejectedBlogsPage';
import PendingBlogsPage from './pages/blogs/PendingBlogsPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/users'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <UserPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/blogs'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <BlogPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/approvedBlogs'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <ApprovedBlogsPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/rejectedBlogs'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <RejectedBlogsPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/pendingBlogs'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <PendingBlogsPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route
            path='/analytics'
            element={
              <ProtectedLayout>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </ProtectedLayout>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
