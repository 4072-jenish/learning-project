import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from './pages/login/LoginPage'
import UserPage from './pages/users/UsersPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import BlogPage from './pages/blogs/BlogsPage'
import AnalyticsPage from './pages/analytics/AnalyticsPage'
import DashboardLayout from './layouts/DashboardLayout'
import ApprovedBlogsPage from './pages/blogs/ApprovedBlogsPage'
import RejectedBlogsPage from './pages/blogs/RejectedBlogsPage'
import PendingBlogsPage from './pages/blogs/PendingBlogsPage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <DashboardLayout>
              <LoginPage />
            </DashboardLayout>
          } />
          <Route path='/users' element={
            <DashboardLayout>
              <UserPage />
            </DashboardLayout>
          } />
          <Route path='/dashboard' element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          } />
          <Route path='/blogs' element={
            <DashboardLayout>
              <BlogPage />
            </DashboardLayout>
          } />
          <Route path='/approvedBlogs' element={
            <DashboardLayout>
              <ApprovedBlogsPage />
            </DashboardLayout>
          } />
          <Route path='/rejectedBlogs' element={
            <DashboardLayout>
              <RejectedBlogsPage/>
            </DashboardLayout>
          } />
          <Route path='/pendingBlogs' element={
            <DashboardLayout>
              <PendingBlogsPage/>
            </DashboardLayout>
          } />
          <Route path='/analytics' element={
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
