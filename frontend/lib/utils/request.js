'use server';

import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function request(endpoint, options = {}, useAuth = true) {
  const cookieStore = await cookies();
  const token = cookieStore.get('TRULINK_ACCESS_TOKEN')?.value;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (useAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

export default request;
