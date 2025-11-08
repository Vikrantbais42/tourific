'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  // IMPORTANT: This is a hardcoded credential for demonstration purposes.
  // In a real-world application, you should use a secure authentication system.
  if (username === 'admin' && password === 'password') {
    cookies().set('admin-session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    return {
      error: 'Invalid username or password.',
    };
  }
}


export async function logout() {
    cookies().delete('admin-session');
    redirect('/admin');
}
