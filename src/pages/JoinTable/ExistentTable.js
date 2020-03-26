import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { FaTrash } from "react-icons/fa";

import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

export default function ExistentTable() {

    const UserId = localStorage.getItem(['user'])
    const [tables, setTables] = useState([])

    useEffect(() => {
        async function loadTables() {
            const responseTable = await api.post('/tables', { UserId })
            if (responseTable.data != null) {
                setTables(responseTable.data)
            }
        }

        loadTables()
    }, [tables])

    return (
        <>
            {
                tables.map((data, index) => {
                    if (data) {
                        return <div className="tableJoin" key={index}>
                            <Link to="/sessions" ><button className='btn newTableBtn' onClick={() => {
                                localStorage.setItem('idTable', data._id)
                            }} >{data.tableName}</button></Link>
                            <a onClick={async function () {
                                let _id = data._id;
                                const responseDelete = await api.delete('/delete', { headers: { _id } })
                                console.log(responseDelete);
                            }}><FaTrash /></a>
                        </div>
                    } else {
                        return <div>
                            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                                <ins class="adsbygoogle"
                                style="display:block"
                                data-ad-client="ca-pub-2485166822479834"
                                data-ad-slot="2411642128"
                                data-ad-format="auto"
                                data-full-width-responsive="true"></ins>
                            <script>
                                (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                        </div>
                    }
                })
            }
        </>
    );
}
