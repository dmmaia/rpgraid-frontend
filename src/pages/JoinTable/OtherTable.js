import React, { useState } from 'react';
import api from '../../services/api';

import loading from '../../assets/load.gif'

import {
    BrowserRouter as Router,
    Link,
    Redirect
  } from "react-router-dom";

export default function OtherTable(props) {

    function clicked(){
		if(tableId){
			var elementToggleMenu = document.getElementById('btn');
			elementToggleMenu.classList.toggle('dontDisplay');
			
			
			var elementToggleMenu = document.getElementById('clickedButton');
			elementToggleMenu.classList.toggle('btnCliked');
			elementToggleMenu.classList.toggle('dontDisplay');
		}
    }

    const [tableId, setTableId] = useState()

    async function handleSearch(event){
        event.preventDefault()

        const response = await api.post('/tables', {_id:tableId});

        if(response.data){
        localStorage.setItem('idTable', response.data._id)
        props.history.push('/sessions')
        }else{
            clicked();
            setTableId('');
            //alert('Invalid Adress');
        }   

    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input name="existentTable" type="text" value={tableId} onChange={event => setTableId(event.target.value)} placeholder="Table Adress" required />
                <input onClick={clicked} id="btn" type="submit" value="Join Table" className="btn" />
                <button id="clickedButton" className="dontDisplay"><img src={loading} /></button>
            </form>
        </>
    );
}
