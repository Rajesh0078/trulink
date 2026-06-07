import React from 'react';

const layout = ({ children }) => {
  return (
    <div className="px-[4%] py-6 md:py-10 w-full overflow-y-auto">
      <div className="text-[20px] font-extrabold">
        My <span className="colored-text">Matches</span>
      </div>
      <section className="mt-5 w-full flex-center">{children}</section>
    </div>
  );
};

export default layout;
