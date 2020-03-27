import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import ExistentTable from './ExistentTable';
import OtherTable from './OtherTable';

export default function JoinTable({history}) {

    const UserId = localStorage.getItem(['user'])
    const Name = localStorage.getItem(['name'])

	if(!UserId){
		history.push('/');
    }

    const [tableName, setTableName] = useState();

    async function handleCreateTable(event){
        event.preventDefault();
        const response = await api.post('/tables', {tableName, UserId});
        setTableName('');
    }

  return (
    <div className="container-Input">
        <div className="join-Table newTable">
            <ExistentTable />
        </div>

        <div className="join-Table">
            <OtherTable history={history} />
        </div>

        <div className="join-Table">
            <form onSubmit={handleCreateTable}>
                <input name="newtable" type="text" value={tableName} onChange={event => setTableName(event.target.value)} placeholder="Table name" required />
                <input type="submit" value="Create Table" id="btn3" className="btn" />
            </form>
        </div>
    </div>
  );
}
