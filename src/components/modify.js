import React, { useState, useEffect } from 'react';
import db from "../firebase"
import { onSnapshot, collection, getDocs } from 'firebase/firestore';
//npm install @mui/lab
//Module not found: Can't resolve 'date-fns/_lib/format/longFormatters' in 'C:\Us   -->
//solution : https://stackoverflow.com/questions/61822733/module-not-found-cant-resolve-date-io-date-fns

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';


function Modify({changePage}) {


    useEffect( async() => {
        const querySnapshot = await getDocs(collection(db, "invest"));
        setInvestState(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id })));

        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //      console.log(doc.id, " => ", doc.data());
        //      //setInvestState(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id })))
        //      //setInvestState(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id })));
        // });
    },[]);



    // const modify = () => {
        
    // }
    //https://www.youtube.com/watch?v=tojwQEdI-QI&ab_channel=Codevolution
    //https://www.youtube.com/watch?v=GM32D6xLhZY&ab_channel=kagayajohn 집어 넣기
    //https://www.youtube.com/watch?v=ASF7zvlDCFk&ab_channel=DedicatedManagers  집어 넣기

    const [investState, setInvestState] = useState([])

    const dateConvert = (t) => { 
        console.log(t);
        console.log(t.constructor.name);
        const cc = t.toDate();   // firebase method  //https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp#todate
        return cc;
    }

    const [value, setValue] = React.useState(null);

    const renderInvestStateDisp = investState.map(item => {

        // setValue(item.time);
        // value = item.time;

        return (  //JSX
            <div key={item.id}>
                <span>{item.state} </span> 
                <span>{item.cointype} </span>
                <input readOnly value={item.balance}></input>
                {/* <input readOnly value={item.time.toDate().toLocaleTimeString()}></input> */}
                {/* { () => setValue(item.time)} */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Basic example"
                    value={value}
                    onChange={(newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
        );
    });


    // modify function return
    return (
    <div>
        {renderInvestStateDisp}
        {/* <button onClick={ ()=>modify() }>modify</button> */}
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
            label="Basic example"
            value={value}
            onChange={(newValue) => {
            setValue(newValue);
            console.log(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider> */}
        <button onClick={ ()=>changePage('home') }>go to home</button>
    </div>
    );
}

//Can't resolve '@emotion/react'
// npm install @emotion/react
// / npm install @emotion/core
export default Modify;