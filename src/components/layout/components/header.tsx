
import { useHeaderProps } from 'components/core/use-header-props';

import LogoutModal from 'auth/logout-modal';
import { useState } from 'react';


function Header() {
  const { title } = useHeaderProps();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  return (
    <section className="flex justify-between items-center w-full">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="flex items-center gap-2">
        <img src="/images/user-default.png" alt="user" className="w-10 h-10 rounded-full" />
        <span>Admin</span>
      </div>
      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </section>

  );
}

export default Header;
