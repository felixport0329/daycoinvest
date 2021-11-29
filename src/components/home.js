import React, { useState, useEffect } from 'react';

import db from "../firebase"
import { onSnapshot, collection } from 'firebase/firestore';

function Home({changePage}) {

    const [invests, setInvests] = useState([]);
    
    console.log(invests);
    
    useEffect( () => 
      onSnapshot(collection(db,"invest"),(snapshot)=>
        //console.log(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id })));
        //setInvests(snapshot.docs.map((doc)=> doc.data()));
        setInvests(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id })))
      ),
      []
    );

    return (
    <div>
        <ul>
        {invests.map((invest)=>(
            <li key={invest.id}>
                {invest.state}
                {invest.cointype}
            </li>
        ))}
        </ul>
        <div>
        Current total investment amount : 3000 <br/>
        Revenue : 31500 (5% up)<br/>
        </div>
        <br/>
        <div>
        In-progress investment status <br/>
        Active - Bitcoin : 10 pound per a day (13:00pm) <br/>
        Active - Ether : 10 pound per a day (15:00pm) <br/>
        </div>
        <button onClick={()=>{ changePage('modify') }}>Modify investment</button>
    </div>
    );
}

export default Home;