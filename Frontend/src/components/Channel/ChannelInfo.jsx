import React from 'react';
import { formatSubscriberCount, formatSubscribedToCount } from "../../utils/numberUtils"

const ChannelInfo = ({ name, handle, subscribers, subscribed }) => (
  <div className="mr-auto inline-block">
    <h1 className="font-bold text-xl">{name}</h1>
    <p className="text-sm text-gray-400">@{handle}</p>
    <p className="text-sm text-gray-400">
      {formatSubscriberCount(subscribers)} · {formatSubscribedToCount(subscribed)}
    </p>
  </div>
);

export default ChannelInfo;