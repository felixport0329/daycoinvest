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
        let c = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
        //[
        //     {state:"ACTIVE", cointype:"BitCoin", balance:"3000", time:"13:00", id:},
        //     {state:"INACTIVE", cointype:"Ether", balance:"2000", time:"14:00", id:},
        //]

        // convert from timestamp (firebase) to date (js) object
        // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp#todate
        // c.forEach(function myF(value, index, array){
        c.forEach((value, index, array) => {
            value.time = value.time.toDate();
        });
        //NOTE: expect re-renderting based on value of state changed
        //When getting date from firebase throuhg useEffect, it must be re-rendering
        setState(c);
    },[]);

    
    //Date to Timestamp in order to insert it into firebase
    //1. https://www.youtube.com/watch?v=GM32D6xLhZY&ab_channel=kagayajohn 
    //2. https://www.youtube.com/watch?v=ASF7zvlDCFk&ab_channel=DedicatedManagers

    const [state, setState] = useState([])

    const renderInvestStateDisp = state.map((item, index)=> {
        return (  //JSX
            <div key={item.id}>
                <span>{item.state} </span> 
                <span>{item.cointype} </span>
                <input
                    // we don't need name as we're not going to update a specific input component. (I don't know how it can)
                    value={item.balance}
                    onChange={(e)=>{ 
                        state[index].balance = e.target.value; //Could it be possible? even though it's const
                        setState([...state]);
                        }}>
                </input>
                {/* https://www.youtube.com/watch?v=tojwQEdI-QI&ab_channel=Codevolution    Data Picker */}
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                    label="Basic example"
                    value={item.time}
                    onChange={(newValue) => {
                    state[index].time = newValue;
                    setState([...state]);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
        );
    });

    return (
    <div>
        {renderInvestStateDisp}
        <button onClick={ ()=>changePage('home') }>go to home</button>
    </div>
    );
}

export default Modify;