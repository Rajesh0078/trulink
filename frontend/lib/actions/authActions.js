'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

const loginAction = async (data) => {
  console.log(data);
};

const logoutAction = async () => {
  const cookieStore = await cookies();
  await cookieStore.delete('TRULINK_ACCESS_TOKEN');
  redirect('/login');
};

export { guestAction, loginAction, logoutAction };
