import React, { useState } from 'react';
import api from '../../services/api';

import {
    BrowserRouter as Router,
    Link,
    Redirect
  } from "react-router-dom";

export default function OtherTable(props) {

    const [tableId, setTableId] = useState()

    async function handleSearch(event){
        event.preventDefault()

        const response = await api.post('/tables', {_id:tableId});

        localStorage.setItem('idTable', response.data._id)

        props.history.push('/sessions')

    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input name="existentTable" type="text" value={tableId} onChange={event => setTableId(event.target.value)} placeholder="Table Adress" required />
                <input type="submit" value="Join Table" className="btn" />
            </form>
        </>
    );
}
