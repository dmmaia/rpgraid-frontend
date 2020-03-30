import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import FeedRoll from './FeedRoll';
import ToggleMenu from './ToggleMenu';

export default function Table({ history }) {

	const [valueRoll, setValueRoll] = useState([]);
	const [numberDice, setNumberDice] = useState();
	const [dice, setDice] = useState('d4');

	const userId = localStorage.getItem(['user']);
	const userName = localStorage.getItem(['name']);
	const tableId = localStorage.getItem(['idTable']);

	if (!userId) {
		history.push('/');
	} else {
		if (!tableId) {
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
			case 'd20':
				roll = Math.random() * (21 - 1) + 1;
				break;
			case 'd100':
				roll = Math.random() * (101 - 1) + 1;
				break;
		}
		let realroll = parseInt(roll);

		if (realroll === NaN) {
			return null;
		}
		return realroll;
	}

	async function handleRoll(event) {
		event.preventDefault();

		const response = await api.post('/rolls', { valueRoll, userName, userId, tableId })
		console.log(response)

	}

	function handleDisplayAdressMobile() {
		var elementAdress = document.getElementById('cc');
		elementAdress.classList.toggle('mobile-display');

		var elementToggleMenu = document.getElementById('toggle-menu');
		elementToggleMenu.classList.toggle('clicked');
	}

	return (
		<div className="desk">
			<div className="container-connection mobile-display" id="cc">
				<p>Adress: <input type="text" value={tableId} /></p>
			</div>

			<a onClick={handleDisplayAdressMobile}><ToggleMenu /></a>

			<div className="container-Mesa">

				<div id="Roll">
					<FeedRoll />
				</div>

				<form onSubmit={handleRoll}>
					<input type="number" placeholder="N• of dice" min="1" max="10" value={numberDice} onChange={event => setNumberDice(event.target.value)} required />

					<select name="roll" list="cityname"
						placeholder="Dice"
						value={dice}
						onChange={event => setDice(event.target.value)}
						required
					>
						<option value="d100">d100</option>
						<option value="d20">d20</option>
						<option value="d12">d12</option>
						<option value="d10">d10</option>
						<option value="d8">d8</option>
						<option value="d6">d6</option>
						<option value="d4" selected="selected">d4</option>
					</select>


							<input type="submit" value="Roll!" onClick={() => {
								let result = []
								for (var i = 0; i < numberDice; i++) {
									result[i] = Roll(dice);
								}

								setValueRoll(result);
							}} 
							/>
				</form>
			</div>
		</div>
	);
}