import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ConfigProvider } from 'antd';
import { AuthInit, AuthProvider } from 'auth/core/auth-context';
import { setupAxios } from 'auth/core/auth-helpers';
import rqConfigs from 'configs/rq-configs';

import Router from 'routes/router';

setupAxios();
const queryClient = new QueryClient(rqConfigs);

function App() {

  useEffect(() => {
    const lang = localStorage.getItem('i18nextLng') || 'en';
    if (lang === 'ar' || lang?.startsWith('ar')) {
      document.body.className = 'font-arabic';
    } else {
      document.body.className = 'font-primary';
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthInit>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#D4502F',
                fontFamily: 'var(--family-primary)',
                borderRadius: 16,
              },
              components: {
                Input: {
                  paddingBlock: 10,
                  fontSize: 18,
                  colorBgContainer: 'var(--color-light-gray)',
                },
                Button: {
                  fontSize: 18,
                  fontFamily: 'var(--family-primary)',
                  borderRadius: 12
                },
                Form: {
                  labelFontSize: 19,
                },
                DatePicker: {
                  fontSize: 16,
                },
                Radio: {
                  radioSize: 20,
                  fontSize: 18,
                  dotSize: 10,
                  wrapperMarginInlineEnd: 24,
                },
                Select: {
                  fontSize: 16,
                  colorBgContainer: 'var(--color-light-gray)',
                },
                Popconfirm: {
                  fontSize: 16,
                },
              },
            }}
          >
            <Router />
          </ConfigProvider>
        </AuthInit>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
