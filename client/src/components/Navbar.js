
import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {

	const history = useHistory();
	const auth = useContext(AuthContext);

	const onLogout = (e) => {
		e.preventDefault();
		auth.logout();
		history.push('/');
	}

	return (
		<header>
			<nav className="blue darken-2">
				<div className="nav-wrapper container">
					<NavLink to="/" className="brand-logo">Link Shortener</NavLink>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><NavLink to="/create">Создать</NavLink></li>
						<li><NavLink to="/links">Ссылки</NavLink></li>
						<li><a href="/" onClick={onLogout}>Выйти</a></li>
					</ul>
				</div>
			</nav>
		</header>
	)
}
