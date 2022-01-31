import React, { useState, useEffect } from 'react';
/** modular web 9 version */
//import db from "../firebase"
//import { onSnapshot, collection, getDocs } from 'firebase/firestore';

import "../App.css"
//import axios from 'axios'
import * as util from "../utillity/util";

//https://dev.to/abhisheks12/read-data-from-firebase-firestore-v9-28be


function Home({changePage}) {

    //get key from firestore  (requst to firebase)
    //access account info  (api request to upbit)
    //display
    useEffect( async () => {
        const key = await util.get_key_from_firestore();
        const res_account_info = await util.getAccountInfo_from_upbit(key[0],key[1]);
        const res_invest_info = await util.get_invest_operation("ijij41"); //getDocs
        //console.log(res_account_info);
        let response = res_account_info.map((doc,index)=>({...doc, id: index}));
        let response_invest = []
        res_invest_info.forEach((doc)=> {
            response_invest.push({...doc.data(), id:doc.id});
        });

        //console.log(response_invest);
        setAsset(response);
        setInvests(response_invest);
    },[]);
    
    // let res = await getAccountInfo_from_upbit(key[0],key[1]);
    // if(res!=null)
    //     console.log(res);
    // else
    //     console.log("null");



    const [asset, setAsset] = useState([]);
    const [invests, setInvests] = useState([]);


    // const options = {method: 'GET', headers: {Accept: 'application/json'}};
    // fetch('https://api.upbit.com/v1/market/all?isDetails=false', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

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

        // await call의 두가지 종류 (???)
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

    
    const asset_coin = asset.slice(1);
    //console.log(asset_coin);
    // console.log("xx");
    // console.log(invests);

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

        <section className="section">
            <div className="container has-text-centered">
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-12 is-vertical ">
                        <div className="tile center my-3">
                            <div>
                            <h3 className="title is-size-5">Current Asset</h3>
                            <ul>
                            {
                                asset_coin.map((item)=> (
                                  <li key={item.id}>
                                      {item.currency}
                                  </li>
                                ))
                            }
                            </ul>                            
                            Current total investment amount : 3000 <br/>
                            Revenue : 31500 (5% up)<br/>
                            </div>
                        </div>
                        <div className="tile center my-3">
                            <div>
                            <h1 className="title is-size-5">Opertaions of Invest.</h1>
                            In-progress investment status <br/>
                            Active - Bitcoin : 10 pound per a day (13:00pm) <br/>
                            Active - Ether : 10 pound per a day (15:00pm) <br/>
                            {
                                invests.map((doc)=>(     // Q. why forEach는 안되지? : ssss
                                    doc.id
                                ))
                            }
                            </div>
                        </div>
                        <div className="tile center my-3">
                        <button className="button is-primary is-small" onClick={()=>{ changePage('modify') }}>Modify</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section has-background-light">
            <div className="container has-text-centered">
                <div className="columns is-vcentered">
                    <div className="column has-text-black">
                        <p>
                        asdlkajsdklasjdklajsd<br/>
                        asdlkajsdklasjdklajsd<br/>
                        asdlkajsdklasjdklajsd<br/>
                        </p>
                    </div>
                    <div className="column">
                        <p>
                        asdlkajsdklasjdklajsd
                        asdlkajsdklasjdklajsd
                        asdlkajsdklasjdklajsd
                        </p>
                    </div>
                    <div className="column">
                        <p>
                        asdlkajsdklasjdklajsd
                        asdlkajsdklasjdklajsd
                        asdlkajsdklasjdklajsd
                        </p>
                    </div>
                </div>
            </div>
         </section>

        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
            </div>
        </footer>

    </div>
    );
}

export default Home;