import React, {useState} from 'react';
import api from '../../services/api';

import loading from '../../assets/load.gif'


export default function Login({history}){

	function clicked(){
		if(userName){
			var elementToggleMenu = document.getElementById('btn');
			elementToggleMenu.classList.toggle('dontDisplay');
			
			
			var elementToggleMenu = document.getElementById('clickedButton');
			elementToggleMenu.classList.toggle('btnCliked');
			elementToggleMenu.classList.toggle('dontDisplay');
		}
    }

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
			placeholder="Your user name!"
			value={userName}
			onChange={event => setUserName(event.target.value)}
			required
			/>
			
			<button onClick={clicked} id='btn' className="btn" type="submit" >Login</button>
			<button id="clickedButton" className="dontDisplay"><img src={loading} /></button>
		</form>
	</div>
	);
}