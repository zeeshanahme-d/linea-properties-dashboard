import { useNavigate } from 'react-router-dom';
import { useHeaderProps } from 'components/core/use-header-props';

import LogoutModal from 'auth/logout-modal';
import { useEffect, useState } from 'react';
import useGetConfigurationData from 'pages/configurations/core/hooks/useGetConfiguration';
import { useGetConfigurationDataFromStore } from 'store/configurationData';
import useGetPromotionFeeData from 'pages/configurations/core/hooks/useGetPromotionFee';
import { useGetPromotionFeeDataFromStore } from 'store/promotionFeeData';
import { useUserProfile } from 'store/userProfile';
import Avatar from 'components/core-ui/avatar/Avatar';


function Header() {
  const { title } = useHeaderProps();
  const { userProfile } = useUserProfile();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { configurationData, isLoading } = useGetConfigurationData();
  const { setConfigurationData, setLoading } = useGetConfigurationDataFromStore();
  const { promotionFeeData, isLoading: promotionFeeLoading } = useGetPromotionFeeData();
  const { setPromotionFeeData, setLoading: setPromotionFeeLoading } = useGetPromotionFeeDataFromStore();

  useEffect(() => {
    setLoading(isLoading);
    if (Object.keys(configurationData || {}).length > 0) {
      setConfigurationData(configurationData)
    } else {
      setConfigurationData(null)
    }
  }, [configurationData, isLoading, setConfigurationData, setLoading])

  useEffect(() => {
    setPromotionFeeLoading(promotionFeeLoading);
    if (Object.keys(promotionFeeData || {}).length > 0) {
      setPromotionFeeData(promotionFeeData)
    } else {
      setPromotionFeeData(null)
    }
  }, [promotionFeeData, promotionFeeLoading, setPromotionFeeData, setPromotionFeeLoading])

  const handleGoToProfile = () => {
    navigate("/profile")
  };

  return (
    <section className="flex justify-between items-center w-full">
      <h2 className="text-2xl font-medium">{title}</h2>
      <button onClick={handleGoToProfile} className="flex items-center gap-2">
        <Avatar
          profilePicture={userProfile?.profilePicture}
          name={userProfile?.name}
          size="md"
          className='cursor-pointer'
        />
        <span className='capitalize'>{userProfile?.name}</span>
      </button>
      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </section>

  );
}

export default Header;
