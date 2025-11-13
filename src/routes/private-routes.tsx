import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from 'components/layout/layout';
import Dashboard from 'pages/dashboard/Dashboard';
import Users from 'pages/users/Users';
import Listings from 'pages/listings/Listings';
import Withdrawals from 'pages/withdrawals/Withdrawals';
import Configurations from 'pages/configurations/Configurations';
import Disputes from 'pages/disputes/Disputes';
import Profile from 'pages/profile/Profile';



function PrivateRoutes() {
  // const { currentUser } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/listings' element={<Listings />} />
        <Route path='/withdrawals' element={<Withdrawals />} />
        <Route path='/configurations' element={<Configurations />} />
        <Route path='/disputes' element={<Disputes />} />
        <Route path='/profile' element={<Profile />} />

        {/* Catch all route */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  );
}

export { PrivateRoutes };
