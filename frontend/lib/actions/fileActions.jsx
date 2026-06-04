'use server';

import { put } from '@vercel/blob';

export async function uploadAvatar(file) {
  const blob = await put(file?.name || `profile_url_${Date.now()}`, file, {
    access: 'public',
    allowOverwrite: true
  });

  return blob;
}
