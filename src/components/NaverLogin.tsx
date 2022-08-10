import React, { useEffect, useState } from 'react';




declare global {
  interface Window {
    naver: any;
  }
}

interface UserInfoTypes{
  email:string;
  id: string;
  name: string;
  nickname:string;
  profile_image:string;
}

  const NAVER_CLIENT_ID = '2Cyk7XU1d9tBv1Q8lYKN'
  

const NaverLogin = () => {
  const [userInfo,setUserInfo] = useState<UserInfoTypes>()

  
    useEffect(() => {
      const {naver} = window;
      const naverLoginscript = document.createElement('script');
      naverLoginscript.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
      naverLoginscript.type = "text/javascript";
      document.head.appendChild(naverLoginscript);

      naverLoginscript.onload = () => {
        
        const naverLogin = new window.naver.LoginWithNaverId({
          clientId:NAVER_CLIENT_ID,
          callbackUrl: "http://localhost:5173",
          callbackHandle:true,
          isPopup: false,
          loginButton: {
            color: "green",
            type: 3,
            height: 60
          }
        })
        
        naverLogin.init()

        console.log(naverLogin)
        // naverLogin.logout();
        naverLogin.getLoginStatus((status:any) => {
          if(status) {
            console.log("Naver 로그인 상태", naverLogin.user);
            setUserInfo(naverLogin.user)
          }
        })      
      };
    }, []);

  return <div className='w-56 h-14' id="naverIdLogin"></div>
};

export default NaverLogin;