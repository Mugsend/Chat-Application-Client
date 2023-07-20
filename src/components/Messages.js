import { useState, useEffect } from 'react';
import Message from './Message';
function Messages({ chatId }) {
	const [messages, setMessages] = useState(null);
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(null);
	const [repliedMessage] = useState(null);

	const sendMessage = () => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append(
			'Authorization',
			'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NGI3YzQ0ZmFkZmRlNzIyM2FkZGUyYzEifQ.U94yG0__MbP6Mmieca7xQHq1fSoabCVQhc5HYsaWgZk',
		);

		var raw = JSON.stringify({
			content: message,
			reply: repliedMessage,
		});

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch(
			'http://localhost:3000/api/chats/64b7d05c0c26ffbdc10d18bd/messages',
			requestOptions,
		)
			.then((response) => response.json())
			.then((result) => {
				setMessages((currentState) => [...currentState, result]);
				setMessage(null);
			})
			.catch((error) => console.log('error', error));
	};
	useEffect(() => {
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append(
			'Authorization',
			'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI2NGI3YzQ0ZmFkZmRlNzIyM2FkZGUyYzEifQ.U94yG0__MbP6Mmieca7xQHq1fSoabCVQhc5HYsaWgZk',
		);

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};

		fetch(`http://localhost:3000/api/chats/${chatId}/messages`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setMessages(result);
				setLoading(false);
			})
			.catch((error) => console.log('error', error));
	}, [chatId]);
	return loading ? (
		<div>loading</div>
	) : (
		<div className="Messages">
			<h2>messages</h2>
			{messages.map((message, index) => (
				<Message key={index} {...{ message }} />
			))}
			<div>
				<textarea
					value={message ? message : ''}
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
				<button disabled={!message} onClick={() => sendMessage()}>
					Send
				</button>
			</div>
		</div>
	);
}

export default Messages;
