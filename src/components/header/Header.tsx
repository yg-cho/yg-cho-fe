import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import * as Style from './Header.style'
import { useRecoilState } from 'recoil';
import { loginState } from '@/atoms/Login'
import { NextPageContext } from 'next';
import { Router } from 'next/router';
const Header = () => {
  const [login, setLogin] = useRecoilState(loginState)
  const [loginInfo, setLoginInfo] = useState(null);
  useEffect(() => {
    setLoginInfo(login)
  },[])


  const logOut = () => {
    setLogin({loggedIn: false, name: ""})
  }

  return (
    <Style.Header>
      <Link href='/'>
        <Style.Title>HAUS</Style.Title>
      </Link>
      {!login.loggedIn ?
        <>
          <Link href='/login'>
            <h2>login</h2>
          </Link>
        </>
        :
        <>
          <h2>{login.name}</h2>
          <Link href='/login'>
            {/*<h2>logout</h2>*/}
            <button onClick={()=> logOut()}>logout</button>
          </Link>
        </>
      }
      {/*{login &&*/}
      {/*  <p>{accessToken}</p>*/}
      {/*}*/}
      {/*<Link href={'/login'}>*/}
      {/*  <p>login</p>*/}
      {/*</Link>*/}
    </Style.Header>
  )
}
// Header.getInitialProps = (ctx: NextPageContext) => {
//   const token = localStorage.getItem("jwt-token")
//   console.log("Already Logined...",token)
// }
export default Header;
