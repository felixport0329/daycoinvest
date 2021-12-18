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

    console.log("modify");
    useEffect( async() => {
        const querySnapshot = await getDocs(collection(db, "invest"));
        console.log("useeffect");
        let c = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
        //console.log(c);
        setInvestState(c);
        //setInvestState(querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id})));
        //--> state변경에 따른 re-rendering 예상. -> modify 전체를 re-rendering하게 된다.
        //useEffect로 db에서 값 가져 오면, 다시 한번 그려지게 된다.

        // const [investState, setInvestState] = useState([
        //     {state:"ACTIVE", cointype:"BitCoin", balance:"3000", time:"13:00"},
        //     {state:"INACTIVE", cointype:"Ether", balance:"2000", time:"14:00"},
        // ])

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
    const [balance, setBalance] = useState([{balance:0},{balance:2}])
    const [state, setState] = useState({
        // balance: Array(2).fill(2),
        balance: [1,2],
    });
        

    const dateConvert = (t) => { 
        console.log(t);
        console.log(t.constructor.name);
        const cc = t.toDate();   // firebase method  //https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp#todate
        return cc;
    }

    const [value, setValue] = React.useState(null);
    console.log("before map");
    const renderInvestStateDisp = investState.map((item, index)=> {

        // setValue(item.time);
        //value = item.time;
        console.log("map");
        return (  //JSX
            <div key={item.id}>
                <span>{item.state} </span> 
                <span>{item.cointype} </span>
                <input name="balance" 
                    //value={state.balance[index]} 
                    value={item.balance}
                    onChange={(e)=>{ 
                        // let a = state.balance.slice();
                        // a[index] = e.target.value;
                        // setState( {...state, [e.target.name]: a} );  // ...연산자
                        investState[index].balance = e.target.value; //이게 되네? const인데?
                        setInvestState([...investState]);
                        }}>
                </input>
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
            </div>
        );
    });

    console.log("before return main");
    // modify function return
    return (
    <div>
        {renderInvestStateDisp}
        <button onClick={ ()=>changePage('home') }>go to home</button>
    </div>
    );
}

//Can't resolve '@emotion/react'
// npm install @emotion/react
// / npm install @emotion/core
export default Modify;