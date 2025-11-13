import { useNavigate } from 'react-router-dom';
import { useHeaderProps } from 'components/core/use-header-props';

import LogoutModal from 'auth/logout-modal';
import { useEffect, useState } from 'react';
import useGetConfigurationData from 'pages/configurations/core/hooks/useGetConfiguration';
import { useGetConfigurationDataFromStore } from 'store/configurationData';


function Header() {
  const { title } = useHeaderProps();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { configurationData, isLoading } = useGetConfigurationData();
  const { setConfigurationData, setLoading } = useGetConfigurationDataFromStore();

  useEffect(() => {
    setLoading(isLoading);
    if (Object.keys(configurationData || {}).length > 0) {
      setConfigurationData(configurationData)
    } else {
      setConfigurationData(null)
    }
  }, [configurationData, isLoading])

  const handleGoToProfile = () => {
    navigate("/profile")
  };

  return (
    <section className="flex justify-between items-center w-full">
      <h2 className="text-2xl font-medium">{title}</h2>
      <button onClick={handleGoToProfile} className="flex items-center gap-2">
        <img src="/images/user-default.png" alt="user" className="w-10 h-10 rounded-full" />
        <span>Admin</span>
      </button>
      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </section>

  );
}

export default Header;
