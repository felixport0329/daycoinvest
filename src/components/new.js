// import React, { useState, useEffect } from 'react';

// function New({changePage}) {

//     return (
//         <div>
//             new
//         </div>
//     );
// }

// export default New;
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { Timestamp } from "@firebase/firestore";

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import React, { useState, useEffect } from 'react';

function New({changePage}) {

    const d = new Date();
    d.setFullYear(2020,0,1);
    d.setSeconds(0);
    console.log("New"+d)
    const [invest, setInvest] = useState({activate_status:'Active', coin_code:'KRW-BTC', invest_price:5000, coin_name:"Bitcoin", time:d, invest_volume:1.01});  // one transaction

    const createNewInvest = async ()  => {
        console.log(invest);

        const docRef = await addDoc(collection(db, "invest"), {
            activate_status: invest.activate_status,
            invest_price: invest.invest_price,
            coin_name: invest.coin_name,
            coin_code: invest.coin_code,
            invest_volume: invest.invest_volume,
            time: Timestamp.fromDate(invest.time),
            user: "ijij41",
        });
        console.log(docRef);
    }

    return (
        <div>
            <section className="hero has-background-black">
                <div className="hero-body">
                    <div className="container">
                        <figure className="image center">
                            <img src="https://bulma.io/images/placeholders/128x128.png" style={{"maxWidth":"100px"}}/>
                        </figure>
                    </div>
                </div>
            </section>
            <section>
                <nav className="breadcrumb is-right" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="#">Modify</a></li>
                        <li className="is-active"><a href="#" aria-current="page">New</a></li>
                    </ul>
                </nav>
            </section>
            <section>
                <div className="box">
                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <div className="select">
                                <select value={invest.activate_status} 
                                    onChange={(e)=>{ invest.activate_status = e.target.value; setInvest({...invest}); }}>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <div className="select">
                                <select value={invest.coin_code}
                                    onChange={(e)=>{ 
                                        invest.coin_code = e.target.value;
                                        invest.coin_name = e.target[e.target.selectedIndex].text;
                                        setInvest({...invest}); }}>
                                    <option value="KRW-BTC">Bitcoin</option>
                                    <option value="KRW-ETH">Eitherum</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Balance</label>
                        <div className="control">
                            <input className="input" style={{width:"33%"}} 
                            value={invest.invest_price}
                            onChange={(e)=>{ invest.invest_price = e.target.value; setInvest({...invest});}}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Time</label>
                        <div className="control">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                value={invest.time}
                                onChange={(newValue) => {
                                newValue.setFullYear(2020,0,1);
                                newValue.setSeconds(0);
                                invest.time = newValue;
                                setInvest({...invest});
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                step={30}
                            />
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container center">
                    <button className="button mx-2 is-primary" onClick={()=>{ createNewInvest(); changePage('modify'); }}>Ok</button>
                    <button className="button is-primary" onClick={()=>{ changePage('modify') }}>Cancel</button>
                </div>
            </section>
        </div>
    );
}

export default New;