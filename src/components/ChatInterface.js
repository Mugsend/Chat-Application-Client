import { useState } from 'react';
import Chats from './Chats';
import Messages from './Messages';
function ChatInterface() {
	const [activeChatId, setActiveChatId] = useState(null);
	return (
		<>
			<Chats {...{ setActiveChatId }} />
			{activeChatId && <Messages chatId={activeChatId} />}
		</>
	);
}

export default ChatInterface;
