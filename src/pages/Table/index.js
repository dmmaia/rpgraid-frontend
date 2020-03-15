import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import FeedRoll from './FeedRoll'

export default function Table({ history }) {

	const [valueRoll, setValueRoll] = useState([])
	const [numberDice, setNumberDice] = useState()
	const [dice, setDice] = useState()

	const userId = localStorage.getItem(['user'])
	const userName = localStorage.getItem(['name'])
	const tableId = localStorage.getItem(['idTable'])

	if (!userId) {
		history.push('/');
	}else{
		if(!tableId){
			history.push('/jointable');
		}
	}

	function Roll(d) {
		let roll
		switch (d) {
			case 'd4':
				roll = Math.random() * (5 - 1) + 1;
				break;
			case 'd6':
				roll = Math.random() * (7 - 1) + 1;
				break;
			case 'd8':
				roll = Math.random() * (9 - 1) + 1;
				break;
			case 'd10':
				roll = Math.random() * (11 - 1) + 1;
				break;
			case 'd12':
				roll = Math.random() * (13 - 1) + 1;
				break;
		}
		let realroll = parseInt(roll);
		return realroll;
	}

	async function handleRoll(event) {
		event.preventDefault();
		const response = await api.post('/rolls', { valueRoll, userName, userId, tableId })
		console.log(response)
	}

	return (
		<div>
			<div className="container-connection">
				<p>Adress: <input type="text" value={tableId} /></p>
			</div>

			<div className="container-Mesa">

				<div id="Roll">
					<FeedRoll valueRoll={numberDice} />
				</div>

				<form onSubmit={handleRoll}>
					<input type="number" placeholder="N• of dice" min="1" max="10" value={numberDice} onChange={event => setNumberDice(event.target.value)} required />
					<input type="text" placeholder="Dice" value={dice} onChange={event => setDice(event.target.value)} required />
					<input type="submit" value="Roll!" onClick={() => {
						let result = []
						for (var i = 0; i < numberDice; i++) {
							result[i] = Roll(dice);
						}

						setValueRoll(result);
					}} />
				</form>
			</div>
		</div>
	);
}