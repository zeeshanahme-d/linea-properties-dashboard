import { NavLink, useNavigate } from 'react-router-dom';
//icons

// Helpers
import { useState } from 'react';
import LogoutModal from 'auth/logout-modal';

//icons
import DashboardIcon from 'assets/icons/dashboard-icon.svg?react';
import UsersIcon from 'assets/icons/users-icon.svg?react';
import ListingsIcon from 'assets/icons/listings-icon.svg?react';
import WithdrawalsIcon from 'assets/icons/withdrawals-icon.svg?react';
import ConfigurationsIcon from 'assets/icons/configurations-icon.svg?react';
import DisputesIcon from 'assets/icons/disputes-icon.svg?react';
import LogoutIcon from 'assets/icons/logout-icon.svg?react'
import LogoIcon from 'assets/icons/dashboard-logo.svg?react'



function SidebarRoutes() {

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('dashboard');


  // Define the routes along with the roles that can access them
  const routes = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/',
    },
    {
      key: 'users',
      label: 'Users',
      path: '/users',
      icon: <UsersIcon />,
    },
    {
      key: 'listings',
      label: 'Listings',
      path: '/listings',
      icon: <ListingsIcon />,
    },
    {
      key: 'withdrawals',
      label: 'Withdrawals',
      path: '/withdrawals',
      icon: <WithdrawalsIcon />,
    },
    {
      key: 'configurations',
      label: 'Configurations',
      path: '/configurations',
      icon: <ConfigurationsIcon />,
    },
    {
      key: 'disputes',
      label: 'Disputes',
      path: '/disputes',
      icon: <DisputesIcon />,
    },
  ];

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/');
    setActiveRoute("dashboard")
  };

  return (
    <section className='font-medium flex flex-col h-full w-64 py-5 bg-white'>
      <div className='flex flex-col h-full relative'>
        <button className='flex items-center justify-start px-4' onClick={navigateToDashboard}>
          <LogoIcon />
        </button>
        <div className='overflow-auto mt-5'>
          <div className='flex flex-col text-start'>
            {routes.map(({ key, label, path, icon }) => (
              <NavLink
                key={key}
                className={`flex items-center gap-5 px-4`}
                to={path}
                onClick={() => setActiveRoute(key)}
              >
                <div className={`${activeRoute === key ? 'bg-primary text-white' : 'text-medium-gray'} py-2 px-4 rounded-xl relative w-[100%] flex items-center my-2 justify-start gap-4 font-normal text-lg ${activeRoute === key ? 'bg-primary text-white' : ''}`} >
                  {icon}
                  <span>{label}</span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
        <button onClick={() => setLogoutModalOpen(true)} className={'flex w-full absolute bottom-0 text-lg ps-10 text-primary p-2 items-center justify-start gap-4 mt-auto'}>
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </section>
  );
}

export default SidebarRoutes;
