import React from 'react';
import { Link } from 'react-router-dom';

export const LinksList = ({links}) => {

	if(!links.length) {
		return <p className="center">Ссылок пока нет</p>
	}

	return (
		<table className="striped">
			<thead>
				<tr>
					<th>№</th>
					<th>Оригинал</th>
					<th>Сокращенная</th>
					<th>Перейти</th>
				</tr>
			</thead>

			<tbody>
				{links.map((link, idx) => (
					<tr key={link._id}>
						<td>{idx + 1}</td>
						<td>{link.from}</td>
						<td>{link.to}</td>
						<td>
							<Link to={'/detail/' + link._id}>Открыть</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
