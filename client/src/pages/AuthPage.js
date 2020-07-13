import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {

	const auth = useContext(AuthContext);

	const { loading, request, error, clearError } = useHttp();
	const message = useMessage();

	const [form, setForm] = useState({
		email: '',
		password: ''
	})

	useEffect(() => {
 
		message(error)
		clearError();
	}, [error, message, clearError])

	useEffect(() => {
		window.M && window.M.updateTextFields();
	}, [])

	const onChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const onLogin = async () => {
		try {
			const data = await request('/api/auth/login', 'POST', {...form})
			auth.login(data.token, data.userId)
		} catch (err) {
			
		}
	}

	const onRegiser = async () => {
		try {
			const data = await request('/api/auth/register', 'POST', {...form})
			message(data.message)
		} catch (err) {}
	}

	return (
		<div className="row">
			<div className="col s6 offset-s3 center-align">
				<form className="card white" onChange={onChange}>
					<div className="card-content white-text">
						<span className="card-title black-text mb-3">Вход</span>
						<div className="row">
							<div className="input-field col s6">
								<input id="email" name="email" type="text" className="validate" />
								<label htmlFor="email">E-mail</label>
							</div>
							<div className="input-field col s6">
								<input id="password" name="password" type="password" className="validate" />
								<label htmlFor="password">Пароль</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button className="btn waves-effect waves-light btn-large mr-3" onClick={onLogin} type="button">Авторизация</button>
						<button className="btn waves-effect waves-light grey darken-3 btn-large" onClick={onRegiser} type="button" disabled={loading}>Регистрация</button>
					</div>
				</form>
			</div>
		</div>
	)
}