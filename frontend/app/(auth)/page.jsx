
import React from "react";
import GuestCard from "./_components/GuestCard";

const page = () => {
  return (
    <div className="flex-center h-[calc(100dvh-64px)] px-6">
      <div className="max-w-2xl w-full text-center space-y-3 sm:space-y-6 flex-center flex-col">
        <div className="text-2xl sm:text-4xl font-bold">
          <h3>Anonymous Chat, <br /><span className="colored-text text-2xl sm:text-4xl!">True Connections</span></h3>
        </div>

        <p className="text-sm sm:text-[15px] text-text-2 leading-5 sm:leading-6 mb-3 sm:mb-8">
          Connect instantly with strangers around the world. Stay anonymous or
          upgrade to a permanent account to unlock full social features like
          chat history, profile, and friends.
        </p>

        <GuestCard />

        <p className="text-xs text-text-2">
          Safe • Anonymous • Real Conversations
        </p>
      </div>
    </div>
  );
};

export default page;