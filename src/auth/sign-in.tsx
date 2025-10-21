import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';

// import useSignIn from './core/hooks/use-sign-in';
import { useAuth } from './core/auth-context';
// import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';
// import useVerifyToken from './core/hooks/use-verify-token';
// import Container from 'components/core-ui/container/container';

function SignIn() {
  // const { signInMutate, isLoading } = useSignIn();
  // const { mutateVerifyToken, isLoading: verifyTokenLoding } = useVerifyToken();
  const { currentUser, saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // const payload = {
    //   email: values.email,
    //   password: values.password,
    // };
    const authData = {
      api_token: "1234567890",
      data: {
        _id: "1",
        firstName: "John",
        lastName: "Doe",
        email: values.email.trim(),
        role: "admin",
      },
    };
    saveAuth(authData);
    setCurrentUser(authData?.data);
    // signInMutate(payload, {
    //   onSuccess: async (res) => {
    //     if (res) {
    //       const apiToken = res.data.data.data.token;
    //       if (apiToken) {
    //         mutateVerifyToken(apiToken, {
    //           onSuccess: (res) => {
    //             showSuccessMessage('User login successfully');
    //             const authData = {
    //               api_token: apiToken,
    //               data: res?.data?.data?.data,
    //             };
    //             saveAuth(authData);
    //             setCurrentUser(authData?.data);
    //           },
    //         });
    //       }
    //     }
    //   },
    //   onError: (error: any) => {
    //     showErrorMessage(error?.response?.data?.message);
    //     console.error('Failed to sign in user:', error);
    //   },
    // });
  };

  useEffect(() => {
    if (currentUser) {
      navigate('/', { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className={`min-h-screen flex relative items-center justify-center gap-x-5 lg:gap-x-10 xl:gap-x-20`}>
      <div className='h-[95vh] w-[700px] hidden lg:block'>
        <img src="/images/sidebar-image.png" alt="logo" className="mb-4 w-full h-full object-contain" />
      </div>

      <div className='flex flex-col items-center text-center mr-10'>
        <div className="mb-10 flex flex-col items-center">
          <img src="/images/logo.png" alt="logo" className="mb-4 object-contain" />
          <h1 className="text-[40px] font-bold tracking-wide">Welcome back</h1>
          <h2 className="text-xl font-normal text-medium-gray">Enter your credentials to securely access the management panel.</h2>
        </div>
        <div className="w-full max-w-sm">
          <Form name="sign-in" onFinish={onFinish} initialValues={{ email: '', password: '' }} autoComplete="off" layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input your email' }
              ]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-[52px] w-[410px] "
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{
                required: true,
                message: 'Please input your password',
              }, {
                pattern: /^(.{8,})$/,
                message: 'Password must be at least 8 characters long',
              },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                className="h-[52px] w-[410px]"
              />
            </Form.Item>


            <Button
              // loading={isLoading
              type="primary"
              htmlType="submit"
              block
              className="h-[52px] w-[410px]"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
