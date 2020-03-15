import React, {useState} from 'react';
import api from '../../services/api';


export default function Login({history}){

	const [userName, setUserName] = useState('');

	async function handleSubmit(event){
	    event.preventDefault();

	    const response = await api.post('/sessions', {userName} )

	    const {_id} = response.data;

		localStorage.setItem('user', _id);
		localStorage.setItem('name', userName);

	    history.push('/jointable');
	}

	return (
	<div className="container-Input">
		<form onSubmit={handleSubmit}>
			<label htmlFor="userName">Username: </label>
			<input  
			type="text"
			id="Username"
			placeholder="Nome de usuário"
			value={userName}
			onChange={event => setUserName(event.target.value)}
			required
			/>

			<button className="btn" type="submit" >Entrar</button>
		</form>
	</div>
	);
}