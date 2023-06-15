import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import BottomBar from './components/bottombar/BottomBar';
import Explore from './pages/explore/Explore';
import Login from './pages/login/Login';
import UserProfile from './pages/userProfile/UserProfile';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/editProfile/EditProfile';
import Notifications from './pages/notifications/Notifications';
import PostForm from './pages/postForm/PostForm';
import Header from './components/header/Header';
import Post from './components/post/Post';
import Register from './pages/register/Register';

import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ResetPassword from './pages/resetPassword/ResetPassword';
import ChangePassword from './pages/chagepassword/ChangePassword';
import Search from './pages/search/Search';

const App = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const userLogin = useSelector(state => state.userLogin)
  const currentUser = userLogin.userInfo;
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    if (currentUser === null) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const Layout = () => {
    return <ProtectedRoute>
      <div style={{ display: "flex" }}>
        {isMobile ? <> <BottomBar /><Header/> </> : <Sidebar />}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/profile" exact element={<UserProfile />} />
          <Route path="/profile/:username"  element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/explore/post/:id" element={<Post />} />
          <Route path="/activity" element={<Notifications />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/changepassword" element={<ChangePassword/>} />

          <Route path="*" element={<h1>404 Page Not Found</h1>} />

        </Routes>
      </div>
    </ProtectedRoute>
  }

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App" data-theme={darkMode ? 'dark' : 'light'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword/>} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;