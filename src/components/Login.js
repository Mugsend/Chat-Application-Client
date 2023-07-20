import { useEffect, useState } from 'react';
function Login({ setLoggedIn }) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCpassword] = useState('');
	const [mode, setMode] = useState('login');
	const [usernameAvailable, setUsernameAvailable] = useState(false);

	useEffect(() => {
		const getUsernameAvailable = async () => {
			return await fetch(
				'http://localhost:3000/api/checkUsernameAvailability',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ username }),
				},
			);
		};
		if (mode === 'signUp')
			getUsernameAvailable().then(
				async (result) =>
					await result.json().then((result) => setUsernameAvailable(result)),
			);
	}, [mode, username]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (mode === 'signUp' && !usernameAvailable) return;
		fetch(
			mode === 'login'
				? 'http://localhost:3000/api/auth/signin'
				: 'http://localhost:3000/api/auth/signUp',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			},
		)
			.then((result) => {
				console.log(result);
				if (result.status === 200) setLoggedIn(true);
			})
			.catch((error) => {
				console.error('Error occurred during login:', error);
			});
	};
	return (
		<div className="Login">
			<div onClick={() => setMode('login')}>Login</div>
			<div onClick={() => setMode('signUp')}>Sign Up</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				{mode === 'signUp' && (
					<span>{usernameAvailable ? 'Available' : 'Not available'}</span>
				)}
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{mode === 'signUp' && (
					<input
						type="password"
						placeholder="Confirm Password"
						value={cPassword}
						onChange={(e) => setCpassword(e.target.value)}
					/>
				)}

				<button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
			</form>
		</div>
	);
}

export default Login;
