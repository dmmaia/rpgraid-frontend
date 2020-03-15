import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export default function ExistentTable() {

    const UserId = localStorage.getItem(['user'])
    const [tables, setTables] = useState(["You've never even create a Table!"])

    useEffect(() => {
        async function loadTables() {
            const responseTable = await api.post('/tables', { UserId })
            console.log(responseTable.data)
            if (responseTable.data != null) {
                setTables(responseTable.data)
            }
        }

        loadTables()
    }, [])

    return (
        <>
            {
                tables.map((data, index) => {
                    return <Link to="/sessions" key={index}><button className='btn newTableBtn'  onClick={() => {
                        localStorage.setItem('idTable', data._id)
                    }} >{data.tableName}</button></Link>
                })
            }
        </>
    );
}
