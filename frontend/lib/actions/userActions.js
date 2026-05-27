'use server';

import request from '../utils/request';

const getProfileAction = async () => {
  const res = await request(
    '/user/',
    {
      method: 'GET'
    },
    true
  );
  return res;
};

const discoverUsers = async (data) => {
  const res = await request(
    '/user/discover',
    {
      method: 'POST',
      body: JSON.stringify(data)
    },
    true
  );
  return res;
};

export { getProfileAction, discoverUsers };
