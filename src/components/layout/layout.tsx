import { Outlet } from 'react-router-dom';
import { HeaderPropsProvider } from 'components/core/use-header-props';

import Header from './components/header';
import SidebarRoutes from './components/sidebar-routes';

function Layout() {
  return (
    <HeaderPropsProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full  w-64 border-r bg-white z-50">
          <SidebarRoutes />
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-col ml-64" style={{ width: 'calc(100% - 256px)' }}>
          {/* Header */}
          <header className="fixed top-0 right-0 left-64 h-20 border-b bg-background z-40 flex items-center px-6">
            <Header />
          </header>

          {/* Page body scrollable */}
          <main className="mt-28 h-[calc(100vh-6rem)] overflow-y-auto px-6 pb-10">
            <Outlet />
          </main>
        </div>
      </div>
    </HeaderPropsProvider>
  );
}

export default Layout;
