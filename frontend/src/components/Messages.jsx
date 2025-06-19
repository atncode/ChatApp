import Message from './Message'
import { useSelector } from 'react-redux'

const Messages = ({ currentChannelId }) => {
  const messagesItems = useSelector(state => state.auth.messages)

  return messagesItems
    .filter(({ channelId }) => channelId === currentChannelId)
    .map(message => (<Message key={message.id} message={message} />))
}

export default Messages
