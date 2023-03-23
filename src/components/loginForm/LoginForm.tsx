import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { LoginForm, LoginFormValidate } from '@/types/LoginForm';
import * as Login from '@/components/loginForm/LoginForm.style'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loginState } from '@/atoms/Login'
import { router } from 'next/client';

const LoginForm: NextPage = () => {
  const [login, setLogin] = useRecoilState(loginState)

  const [type,setType] = useState<LoginFormValidate>({
    id: true,
    password: true,
  });

  const [form, setForm] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const loginCheck = () => {
    axios.post('/login', {
      form
    })
      .then(function (response) {
        const {accessToken, user} = response.data?.data;
        setLogin({loggedIn: true, name: user.NAME})
        localStorage.setItem('jwt-token', response.data?.data.accessToken)
        router.push('/')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const pattern = type.id ? /^[a-zA-z\d]{5,30}$/ : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/
  const checkInput = (input: string) => { return pattern.test(input) }


  useEffect(() => {
    // console.log(form);
    // console.log("type: ",type);

    // if(form.id.length === 0 || form.password.length === 0) return;
    if(form.id.length < 5 || form.id.length > 31) {
      setType((prev) => ({...prev, id: false}));
    } else {
      setType((prev) => ({...prev, id: true}));
    }

    if(form.password.length <8 || form.password.length > 30) {
      setType((prev) => ({ ...prev, password: false }))
    } else {
      setType((prev) => ({ ...prev, password: true }))
    }
  },[form,type.id,type.password])

  return (
    <>
      <Login.Form>
        <div>
          <Login.Id>아이디</Login.Id>
          <Login.TextInput wrong={!type.id} type='text' onBlur={(e) => { setForm((prev) => ({ ...prev, id: e.target.value }))}}/>
          {!type.id && <Login.ValidationInfo>올바른 아이디 형식을 입력해주세요!.</Login.ValidationInfo> }
        </div>
        <div>
          <Login.Pwd>비밀번호</Login.Pwd>
          <Login.TextInput wrong={!type.password} type='password' onBlur={(e) =>  { setForm((prev) => ({ ...prev, password: e.target.value }))}}/>
          {!type.password && <Login.ValidationInfo>올바른 비밀번호 형식을 입력해주세요z.</Login.ValidationInfo>}
        </div>
        <Login.LoginButton disabled={!type.id || !type.password} onClick={() => loginCheck()}>로그인</Login.LoginButton>
      </Login.Form>
    </>
  );
};

export default LoginForm;
