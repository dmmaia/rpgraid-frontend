import React, {useState, useEffect} from 'react';
import api from '../../services/api';

export default function FeedRoll(props) {

    const [infoRoll, setInfoRoll] = useState([{'valueRoll':"Let's Play!"}])

    const tableId = localStorage.getItem('idTable')

    const thisUser = localStorage.getItem('name')

    useEffect(()=>{
        async function loadFeed() {
            const response = await api.post('/rolls', { tableId })

            if(response.data != null){
                setInfoRoll((response.data).reverse());
            }
        }

        loadFeed()
    },[infoRoll])

    return (
        <>
            {infoRoll.map((data, index) => {
                return <p key={index}><h4>{data.userName}</h4>{String(data.valueRoll)}</p>
            })}
        </>
    );
}
