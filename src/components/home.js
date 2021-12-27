import React, { useState, useEffect } from 'react';
import db from "../firebase"
import axios from 'axios'
import { onSnapshot, collection, getDocs } from 'firebase/firestore';

//https://dev.to/abhisheks12/read-data-from-firebase-firestore-v9-28be

function Home({changePage}) {

    const [invests, setInvests] = useState([]);
    

    // const options = {method: 'GET', headers: {Accept: 'application/json'}};
    // fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));


    const request = require('request')
    const uuidv4 = require("uuid/v4")
    const sign = require('jsonwebtoken').sign
    
    const access_key = process.env.REACT_APP_UPBIT_OPEN_API_ACCESS_KEY
    const secret_key = process.env.REACT_APP_UPBIT_OPEN_API_SECRET_KEY
    //const server_url = process.env.REACT_APP_UPBIT_OPEN_API_SERVER_URL
    console.log(access_key);
    console.log(secret_key);
    //console.log(server_url);
    
    const payload = {
        access_key: access_key,
        nonce: uuidv4(),
    }
    
    const token = sign(payload, secret_key)
    
    // 동작 안함.
    // const options = {
    //     method: "GET",
    //     //url: server_url + "/v1/accounts",
    //     url: "/v1/accounts",
    //     headers: {Authorization: `Bearer ${token}`},
    // }    
    // request(options, (error, response, body) => {
    //     if (error) throw new Error(error)
    //     // https://developer-talk.tistory.com/91
    //     console.log(body)
    // })
    

    // console.log(Location.origin);
    //const AuthStr = {Authorization: `Bearer ${token}`}
    const AuthStr = 'Bearer '.concat(token); 
    //console.log(AuthStr);
    const URL = "/v1/accounts"
    axios.get(URL, { headers: {Authorization: AuthStr} })
    .then(response => {
        // If request is good...
        console.log(response.data);
    })
    .catch((error) => {
        console.log('error ' + error);
    });


    //console.log(invests);
    
    //https://www.google.com/search?q=react+firestore+v9&rlz=1C1CHBF_en-GBGB923GB923&oq=react+firestore+v9&aqs=chrome.0.69i59l2j69i61l2.2944j0j4&sourceid=chrome&ie=UTF-8
    // useEffect( () => 
    //   onSnapshot(collection(db,"invest"),(snapshot)=>
    //     //console.log(snapshot.docs.map((doc)=> ({...doc.data(), id: doc.id })));
    //     //setInvests(snapshot.docs.map((doc)=> doc.data()));
    //     setInvests(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id })))
    //   ),
    //   []
    // );

    // await 가 되네
    // useEffect( () => {
    //     const getData = async() => {
    //         const parkingData = await getDocs(collection(db,"invest"));
    //         setInvests(parkingData.docs.map((doc)=>({...doc.data(), id: doc.id })));
    //     };
    //     getData();
    // },[]);

    
    //https://firebase.google.cn/docs/firestore/query-data/get-data?hl=ko
    // useEffect( async() => {
    //     const querySnapshot = await getDocs(collection(db, "invest"));
    //     querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     });
    // },[]);

    
      

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