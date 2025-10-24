import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, InputRef } from 'antd';

// import useSignIn from './core/hooks/use-sign-in';
import { useAuth } from './core/auth-context';
// import { showErrorMessage, showSuccessMessage } from 'utils/messageUtils';
// import useVerifyToken from './core/hooks/use-verify-token';
// import Container from 'components/core-ui/container/container';



import LogoIcon from 'assets/icons/dashboard-logo.svg?react'
import EyeOpenIcon from 'assets/icons/eye-open-icon.svg?react'
import EyeClosedIcon from 'assets/icons/eye-close-icon.svg?react'
import LeftHandImage from '.../../../../public/images/lefthand-image.svg?react'
import RightHandImage from '.../../../../public/images/righthand-image.svg?react'



function SignIn() {
  // const { signInMutate, isLoading } = useSignIn();
  // const { mutateVerifyToken, isLoading: verifyTokenLoding } = useVerifyToken();
  const { currentUser, saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordInputRef = useRef<InputRef>(null);
  const passwordSpanRef = useRef<HTMLSpanElement>(null);


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
    <div className={`overflow-hidden h-screen flex relative items-center 2xl:gap-x-10`}>
      <div className='hidden lg:block w-1/2 py-4 pl-4 h-full'>
        <div className='relative w-full h-full'>
          <img src="/images/bg-sidebar-image.png" alt="logo" className="w-full h-full rounded-xl object-cover" />
          <LeftHandImage className='absolute top-1/2 -translate-y-1/2 left-0 w-[200px]  xl:w-[250px] xl1520:w-[350px]' />
          <RightHandImage className='absolute top-1/2 -translate-y-1/2 right-0 w-[200px]  xl:w-[250px] xl1520:right-[-39px]  xl1520:w-[350px]' />
        </div>
      </div>

      <div className='flex flex-col items-center text-center w-full lg:w-1/2 '>
        <div className="mb-10 flex flex-col items-center">
          <LogoIcon className='w-[150px] h-[70px]' />
          <h1 className="text-[40px] font-bold tracking-wide">Welcome back</h1>
          <h2 className="text-lg font-normal text-medium-gray md:max-w-md">Enter your credentials to securely access the management panel.</h2>
        </div>
        <div className="w-full max-w-sm text-start">
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
                className="h-[52px] w-[410px] focus:bg-[#ffffff] bg-light-gray"
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
              <Input
                ref={passwordInputRef}
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="h-[52px] w-[410px] py-0 bg-light-gray password-input"
                styles={{
                  input: {
                    backgroundColor: '#EFEFEF',
                    borderRadius: '16px 0px 0px 16px',
                    paddingLeft: "12px"
                  }
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = 'white';
                  if (passwordSpanRef.current) {
                    passwordSpanRef.current.className += ' bg-[#ffffff] transition-all duration-200';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = '';
                  if (passwordSpanRef.current) {
                    passwordSpanRef.current.className = ' cursor-pointer flex-centered h-full w-10 transition-all duration-200';
                  }
                }}
                suffix={
                  <span
                    ref={passwordSpanRef}
                    style={{ borderRadius: '0px 16px 16px 0px' }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className={`cursor-pointer flex-centered h-full w-10`}
                  >
                    {passwordVisible ? <EyeOpenIcon className='cursor-pointer -mt-1' /> : <EyeClosedIcon className='cursor-pointer' />}
                  </span>
                }
              />
            </Form.Item>


            <Button
              // loading={isLoading
              type="primary"
              htmlType="submit"
              block
              className="h-[52px] w-[410px] mt-5"
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
