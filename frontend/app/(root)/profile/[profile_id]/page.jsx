import React from 'react';

const page = async ({ params }) => {
  const { profile_id } = await params;
  return <section className="page">{profile_id}</section>;
};

export default page;
