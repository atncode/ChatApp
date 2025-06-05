import getNoun from './plural';

export const getCurrentChannelName = (currentChannelId, channels) => {
  const currentChannel = channels.filter(({ id }) => (id ===  currentChannelId));
  return currentChannel.name;
};

export const getMessagesCount = (currentChannelId, messages) => {
  const count = messages.filter(({channelId}) => channelId === currentChannelId).length;
  return `${count} ${getNoun(count, 'сообщение', 'сообщения', 'сообщений')}`;
};
