import  { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { signInNaverHandler } from '../../store/slices/UserSlice';
import { useAppDispatch } from '../../store/store';

declare global {
  interface Window {
    naver: any;
  }
}

const NAVER_CLIENT_ID = '2Cyk7XU1d9tBv1Q8lYKN';

const NaverLogin = () => {
 
  const dispatch = useAppDispatch();
 
  const navigate = useNavigate();
  useEffect(() => {
    const { naver } = window;
    const naverLoginscript = document.createElement('script');
    
    naverLoginscript.src =
      'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
    naverLoginscript.type = 'text/javascript';
    document.head.appendChild(naverLoginscript);

    naverLoginscript.onload = () => {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: NAVER_CLIENT_ID,
        callbackUrl: 'https://safesea.vercel.app/auth',
        callbackHandle: true,
        isPopup: false,
        loginButton: {
          color: 'green',
          type: 3,
          height: 60,
        },
      });

      naverLogin.init();

      // naverLogin.logout();naverLogin.user
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          dispatch(
            signInNaverHandler({
              email: naverLogin.user.email,
              id: naverLogin.user.id,
              name: naverLogin.user.name,
              nickname: naverLogin.user.nickname,
              profile_image: naverLogin.user.profile_image,
            })
          );
          navigate('/')
        }
        
      });
    };
  }, []);

  return (
    <>
    
      <div className="w-60 h-14" id="naverIdLogin"></div>
    </>
  );
};

export default NaverLogin;

//import.meta.env
// react memo의 2번쨰 인자로 콜백함수로 조건 설정할 수 있음. ((prev,next) => prev.property === next.property)
