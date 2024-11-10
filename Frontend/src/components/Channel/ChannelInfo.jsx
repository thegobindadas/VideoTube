import React from 'react';

const ChannelInfo = ({ name, handle, subscribers, subscribed }) => (
  <div className="mr-auto inline-block">
    <h1 className="font-bold text-xl">{name}</h1>
    <p className="text-sm text-gray-400">@{handle}</p>
    <p className="text-sm text-gray-400">
      {subscribers} Subscribers · {subscribed} Subscribed
    </p>
  </div>
);

export default ChannelInfo;