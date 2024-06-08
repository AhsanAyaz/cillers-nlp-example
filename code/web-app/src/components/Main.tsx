import React from 'react';
import useAuth, { login, logout } from '../utils/useAuth';
import Home from './Home';
import Anonymous from './Anonymous';

const LoadingLoginState = () => (
  <div>Waiting for login state info ...</div>
);

const LoadingUserInfo = () => (
  <div>Waiting for user info ...</div>
);

const LoggingOut = () => (
  <div>Logging out ...</div>
);

const Main: React.FC = () => {
  const { getLoginStateComplete, isLoggedIn, csrf, userInfo, isLoggingOut } = useAuth();

  if (isLoggingOut) return <LoggingOut />;
  if (!getLoginStateComplete) return <LoadingLoginState />;
  if (!isLoggedIn) return <Anonymous login={login} />;
  if (!userInfo) return <LoadingUserInfo />;

  if (!csrf) throw new Error("No csrf!");
  return <Home logout={logout} userInfo={userInfo} csrf={csrf} />;

}

export default Main;
