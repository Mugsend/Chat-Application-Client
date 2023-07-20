import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import ChatInterface from './components/ChatInterface';
function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	return (
		<div className="App">
			<h1>Welcome to Chat App</h1>
			{!loggedIn ? <Login {...{ setLoggedIn }} /> : <ChatInterface />}
		</div>
	);
}

export default App;
