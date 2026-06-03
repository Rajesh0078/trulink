'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import request from '../utils/request';

const guestAction = async (data) => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result?.success) {
      await cookieStore.set({
        name: 'TRULINK_ACCESS_TOKEN',
        value: result?.data?.accessToken,
        httpOnly: true,
        path: '/'
      });
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const registerRequest = async (data) => {
  const res = await request('/auth/register/request', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  return res;
};

const registerVerify = async (data) => {
  const res = await request('/auth/register/verify', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (res && res.success) {
    const cookieStore = await cookies();
    await cookieStore.set({
      name: 'TRULINK_ACCESS_TOKEN',
      value: res?.data?.accessToken,
      httpOnly: true,
      path: '/'
    });
  }
  return res;
};

const loginAction = async (data) => {
  const cookieStore = await cookies();
  const res = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (res.success) {
    await cookieStore.set({
      name: 'TRULINK_ACCESS_TOKEN',
      value: res?.data?.accessToken,
      httpOnly: true,
      path: '/'
    });
  }
  return res;
};

const logoutAction = async () => {
  const cookieStore = await cookies();
  await cookieStore.delete('TRULINK_ACCESS_TOKEN');
  redirect('/login');
};

export { guestAction, loginAction, logoutAction, registerRequest, registerVerify };
