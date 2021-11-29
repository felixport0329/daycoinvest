import React, { useState, useEffect } from 'react';

function Modify({changePage}) {
    const modify = () => {
        
    }
    const [investState, setInvestState] = useState([
        {state:"ACTIVE", cointype:"BitCoin", balance:"3000", time:"13:00"},
        {state:"INACTIVE", cointype:"Ether", balance:"2000", time:"14:00"},
    ])
    const renderInvestState = investState.map(item => {
        return (
            <div>
                <span>{item.state} </span>
                <span>{item.cointype} </span>
                <input value={item.balance}></input>
                <input value={item.time}></input>
            </div>
        );
    });
    return (
    <div>
        {renderInvestState}
        <button onClick={ ()=>modify() }>modify</button>
        <button onClick={ ()=>changePage('home') }>go to home</button>
    </div>
    );
}


export default Modify;