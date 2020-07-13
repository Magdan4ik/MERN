import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {

	const history = useHistory();
	
	const auth = useContext(AuthContext);
	const [link, setLink] = useState('');

	const { request } = useHttp();

	const onKeyPress = async e => {
		if(e.key === 'Enter') {
			try {
				const data = await request('/api/link/generate', 'POST', {from: link}, {
					Authorization: `Bearer ${auth.token}`
				})
				history.push(`/detail/${data.link._id}`)
			} catch (err) {}
		}
	}

	return (
		<div className="row">
			<div className="input-field col s6 offset-s3 mt-5p">
				<input id="link" name="link" type="text" className="validate"
					onChange={e => setLink(e.target.value)}
					onKeyPress={onKeyPress}
				 />
				<label htmlFor="link">Вставьте ссылку</label>
			</div>
		</div>
	)
}