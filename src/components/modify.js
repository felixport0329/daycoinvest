import React, { useState, useEffect } from 'react';
import db from "../firebase"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { onSnapshot, collection, getDocs } from 'firebase/firestore';
import { Timestamp } from "@firebase/firestore";
import "../App.css"

//npm install @mui/lab
//Module not found: Can't resolve 'date-fns/_lib/format/longFormatters' in 'C:\Us   -->
//solution : https://stackoverflow.com/questions/61822733/module-not-found-cant-resolve-date-io-date-fns

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import * as util from "../utillity/util";
import { contains } from '@firebase/util';
//import firebase from '../firebase';

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// const db1 = admin.firestore();




function Modify({changePage,user,loginstatus}) {


    // useEffect(()=>{
    //     db1.collection("invest").doc("tz7nuls2qhczJZuLSHdx").get().then((doc) => {
    //         console.log(doc.data().balance);
    //       }).catch((err) => {
    //         console.log("Error", err);
    //       });
    // },[]);

    
    // const handleContentLoad = () => {
    //     // Functions to open and close a modal
    //     function openModal($el) {
    //       $el.classList.add('is-active');
    //     }
      
    //     function closeModal($el) {
    //       $el.classList.remove('is-active');
    //     }
      
    //     function closeAllModals() {
    //       (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    //         closeModal($modal);
    //       });
    //     }
      
    //     // Add a click event on buttons to open a specific modal
    //     (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    //       const modal = $trigger.dataset.target;
    //       const $target = document.getElementById(modal);
    //       console.log($target);
      
    //       $trigger.addEventListener('click', () => {
    //         openModal($target);
    //       });
    //     });
      
    //     // Add a click event on various child elements to close the parent modal
    //     (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    //       const $target = $close.closest('.modal');
      
    //       $close.addEventListener('click', () => {
    //         closeModal($target);
    //       });
    //     });
      
    //     // Add a keyboard event to close all modals
    //     document.addEventListener('keydown', (event) => {
    //       const e = event || window.event;
      
    //       if (e.keyCode === 27) { // Escape key
    //         closeAllModals();
    //       }
    //     });
    //   };


    // useEffect( ()=>{
    //     console.log("using effect");
    //     handleContentLoad();
    // });

    useEffect( async() => {
        // //Second
        // const querySnapshot = await getDocs(collection(db, "invest"));
        // // querySnapshot.forEach((doc) => {
        // //     // doc.data() is never undefined for query doc snapshots
        // //     console.log(doc.id, " => ", doc.data());
        // //   });

        // let c = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
        // //[
        // //     {state:"ACTIVE", cointype:"BitCoin", balance:"3000", time:"13:00", id:},
        // //     {state:"INACTIVE", cointype:"Ether", balance:"2000", time:"14:00", id:},
        // //]
        // // convert from timestamp (firebase) to date (js) object
        // // https://firebase.google.com/docs/reference/js/v8/firebase.firestore.Timestamp#todate
        // // c.forEach(function myF(value, index, array){


        // c.forEach((value, index, array) => {
        //     value.time = value.time.toDate();
        // });
        // //NOTE: expect re-renderting based on value of state changed
        // //When getting date from firebase throuhg useEffect, it must be re-rendering
        // setState(c);

        const querySnapshot_invest = await util.get_invest_operation(user.email); //getDocs
        //[
        //     {state:"ACTIVE", cointype:"BitCoin", balance:"3000", time:"13:00", id:},
        //     {state:"INACTIVE", cointype:"Ether", balance:"2000", time:"14:00", id:},
        //]
        const c = querySnapshot_invest.docs.map((doc)=>({...doc.data(), id: doc.id}))
        c.forEach((value, index, array) => {   //TODO 이거 없앨수 있게 해본다.
             value.time = value.time.toDate();  // TimePicker가 Date를 원하니. Timestamp를 date로 변경 하는 코드 필요.
        });
        console.log("aaaa");
        console.log(c);
        console.log("bbbb");
        setState(c)

    },[]);

    
    //Date to Timestamp in order to insert it into firebase
    //1. https://www.youtube.com/watch?v=GM32D6xLhZY&ab_channel=kagayajohn 
    //2. https://www.youtube.com/watch?v=ASF7zvlDCFk&ab_channel=DedicatedManagers

    // const handlerSave = () => {
    //     state.map(async (item, index)=> {
    //         console.log(item.id+","+index);
    //         const docRef = doc(db, "invest", item.id);
    //         // Set the "capital" field of the city 'DC'
    //         await updateDoc(docRef, {
    //             activate_status: item.activate_status
    //         });
    //     });
    // };
    // const handler_new = () => {

    // };
    const deleteData = async (id) => {
        console.log("deleteDate..");
        console.log(id);
        await deleteDoc(doc(db, "invest", id));
        setState(state.filter(doc => doc.id !== id));
    };

    const handler_save = (e) => {
        e.preventDefault();
        console.log("Handler_save..");
        state.map(async (item, index)=> {
            console.log("SAVE..");
            console.log(item.id+","+index);
            console.log(item.time);
            console.log(Timestamp.fromDate(item.time));
            const docRef = doc(db, "invest", item.id);
            await updateDoc(docRef, {
                activate_status: item.activate_status,
                invest_price : item.invest_price,
                time: Timestamp.fromDate(item.time)
            });
        });
    }

    const [state, setState] = useState([])

    const renderInvestStateDisp = state.map((item, index)=> {
        return (  //JSX
            <tr key={item.id} className="">
                <th>
                    <div className="field">
                        {/* <label className="label">Status</label> */}
                        <div className="control">
                            <div className="select">
                                <select value={item.activate_status} onChange={(e)=>{ state[index].activate_status = e.target.value; setState([...state]); console.log("change event :"+e.target.value); }}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </th>
                <th>
                    <div className="field">
                        {/* <label className="label">Name</label> */}
                        <div className="control">
                            <div className="is-size-6">{item.coin_name}</div>
                        </div>
                    </div>
                </th>
                <th>
                    <div className="field">
                        {/* <label className="label">Balance</label> */}
                        <div className="control">
                            <input className="input"
                                // we don't need name as we're not going to update a specific input component. (I don't know how it can)
                                value={item.invest_price}
                                onChange={(e)=>{ 
                                    state[index].invest_price = e.target.value; //Could it be possible? even though it's const
                                    setState([...state]);
                                    }}>
                            </input>
                        </div>
                    </div>
                </th>
                {/* https://www.youtube.com/watch?v=tojwQEdI-QI&ab_channel=Codevolution    Data Picker */}
                <th>
                    <div className="field">
                        {/* <label className="label">Time</label> */}
                        <div className="control">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                //label="Basic example"
                                value={item.time}
                                onChange={(newValue) => {
                                newValue.setFullYear(2020,0,1);
                                newValue.setSeconds(0);
                                newValue.setMilliseconds(0);
                                state[index].time = newValue;
                                console.log(newValue);
                                setState([...state]);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            </LocalizationProvider>
                        </div>
                    </div>
                </th>
                <th>
                    <div>
                        <button className="button is-primary is-small" onClick={ ()=>deleteData(item.id) }>del</button>
                    </div>
                </th>
            </tr>
        );
    });

    const distop = (
    <section className="hero has-background-black">
        <div className="hero-body">
            <div className="container">
                <figure className="image center">
                    <img src="https://bulma.io/images/placeholders/128x128.png" style={{"maxWidth":"100px"}}/>
                </figure>
            </div>
        </div>
    </section>);

    // const loginstatus = (
    // <section className="section">
    // <div>
    //     <div>
    //         <div>{user.email}</div>
    //         <button onClick={signOut}>SIGNOUT</button>
    //     </div>
    // </div>
    // </section>);

    return (
    <div>
        {distop}
        {loginstatus}
        <section>
            <div className="container center">
                <table className="table">
                    <thead className="is-size-5">
                        <tr>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Balance</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {renderInvestStateDisp}
                    </tbody>
                </table>
            </div>
        </section>

        <section className="center">
            <button className="button mx-2 is-primary is-small" onClick={ ()=>changePage('home') }>go to home</button>
            <button className="button mr-2 is-primary is-small" onClick={ handler_save }>Save</button>
            {/* <button className="button is-primary is-small js-modal-trigger" data-target="modal-js-example">New</button> */}
            <button className="button is-primary is-small" onClick={()=>{ changePage('new') }}>New</button>
        </section>
        
        <div id="modal-js-example" className="modal">
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="box">
                <p>Modal JS example JH</p>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
            </div>
        </div>
    );
}

export default Modify;