import request from '../utils/request';

const getUserActivitiesAction = async ({ page = '1', limit = 10 }) => {
  const res = await request(
    `/activity?page=${page}&limit=${limit}`,
    {
      method: 'GET'
    },
    true
  );
  return res;
};

export { getUserActivitiesAction };
