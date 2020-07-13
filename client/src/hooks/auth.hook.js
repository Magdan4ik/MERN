import { useState, useCallback, useEffect } from 'react';

export const useAuth = () => {

	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);
	const [ready, setReady] = useState(false);

	const login = useCallback((jwtToken, id) => {
			setToken(jwtToken);
			setUserId(id);
			localStorage.setItem('userData', JSON.stringify({
				userId: id, token: jwtToken
			}))	
		}, [])

	const logout = useCallback(
		() => {
			setToken(null);
			setUserId(null);
			localStorage.removeItem('userData')
		}, [])

	useEffect(() => {
		const { token, userId } = JSON.parse(localStorage.getItem('userData') || '{}');

		if(token) {
			login(token, userId);
		}
		setReady(true);

	}, [login])

	return { token, login, logout, userId, ready }
}