import { useEffect, useState } from 'react';

function Chat({ chatId, setActiveChatId }) {
	const [user, setUser] = useState();
	const [loading, setLoading] = useState(true);
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

		fetch(`http://localhost:3000/api/chats/${chatId}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setUser(result);
				setLoading(false);
			})
			.catch((error) => console.log('error', error));
	}, [chatId]);
	return loading ? (
		<div>loading</div>
	) : (
		<div onClick={() => setActiveChatId(chatId)}>{user.username}</div>
	);
}

export default Chat;
