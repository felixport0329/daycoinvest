import React, { useState, useEffect } from 'react';
/** modular web 9 version */
import { signInWithGoogle } from '../firebase';   //변경해보기? 햇깔림
//import { auth } from '../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Init({changePage}) {

//    const [state, setState] = useState({currentUser:null});
    return (
        <div>
            <button type="submit" value="Submit Form">SIGN IN</button>
            <button onClick={signInWithGoogle}>SIGN IN WITH GOOGLE</button>
        </div>
    );
}

export default Init;