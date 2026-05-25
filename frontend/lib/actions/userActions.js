"use server";

import request from "../utils/request";

const getProfileAction = async () => {
  const res = await request(
    "/user/",
    {
      method: "GET",
    },
    true,
  );
  return res;
};

export { getProfileAction };
