import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {

	const { token } = useContext(AuthContext);
	const { request, loading } = useHttp();
	const [link, setLink] = useState(null);

	const { id } = useParams();

	const getLink = useCallback(async () => {
		try {
			const data = await request(`/api/link/${id}`, 'GET', null, {
				Authorization: `Bearer ${token}`
			})
			setLink(data);
		} catch (err) {}
	}, [token, id, request])
	

	useEffect(() => {
		getLink()
	}, [getLink])

	if(loading) {
		return <Loader />
	}

	return (
		<>
			{ !loading && link && <LinkCard link={link}/> }
		</>
	)
}