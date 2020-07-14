import React from 'react'

export const LinkCard = ({ link }) => {
	return (
		<table className="striped">
			<tbody>
				<tr>
					<td>Ваша ссылка:</td>
					<td><a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a> </td>
				</tr>
				<tr>
					<td>Откуда:</td>
					<td><a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></td>
				</tr>
				<tr>
					<td>Клики:</td>
					<td><b>{link.clicks}</b></td>
				</tr>
				<tr>
					<td>Дата создания:</td>
					<td><b>{new Date(link.date).toLocaleDateString()}</b></td>
				</tr>
			</tbody>
		</table>
	)
}
