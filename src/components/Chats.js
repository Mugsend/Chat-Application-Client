import { useEffect, useState } from 'react';
import Chat from './Chat';
function Chats({ setActiveChatId }) {
	const [chats, setChats] = useState();
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

		fetch('http://localhost:3000/api/chats', requestOptions)
			.then((response) => response.json())
			.then((result) => {
				setChats(result);
				setLoading(false);
			})
			.catch((error) => console.log('error', error));
	}, []);
	return loading ? (
		<div>loading</div>
	) : (
		<div className="Chats">
			<h2>chats</h2>
			{chats.map((chat, index) => (
				<Chat key={index} chatId={chat._id} {...{ setActiveChatId }} />
			))}
		</div>
	);
}
export default Chats;
