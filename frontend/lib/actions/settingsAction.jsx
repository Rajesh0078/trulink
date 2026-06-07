import request from '../utils/request';

const updateSettingsAction = async (payload) => {
  const res = await request(
    '/user',
    {
      method: 'PATCH',
      body: JSON.stringify(payload)
    },
    true
  );
  return res;
};

export { updateSettingsAction };
