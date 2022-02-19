
import React, { useState, useEffect } from 'react';
import Home from './components/home';
import Modify from './components/modify';
import New from './components/new';
import Init from './components/init';
import "./App.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from './firebase';   //변경해보기? 햇깔림


function App() {
  // const onSubmit=(e)=>{
  //   e.preventDefault();
  //   alert('aaaa');
  // }
  // const onKeyUp =(event)=>{
  //   if(event.keyCode===13){
  //       onSubmit();
  //   }
  //   //console.log('keyup');
  // }
  // const updateText=()=>{
  //   setText('sss');
  // }
 
  // useEffect(()=>{console.log(count),[count]})  // 렌더링 될때마다 실행 되게.  count가 변경될때만...변경 / 한번만 되고 안되게 하려면 []

  // const [text, setText] = useState('init');  
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
   //const ref = firebase.firestore().collection("invest");
  

   
  const [user, setUser] = useState({currentUser:null});
  const [viewPage, setViewPage] = useState('home');
  //const [viewPage, setViewPage] = useState('modify');
  // 물고 들어 가서 subcomponent에서 변경 하는 함수
  const changePage = (page)=>{
    setViewPage(page);   // re-redering
  }


  useEffect(
      ()=>{
          const auth = getAuth();
          onAuthStateChanged(auth, (user) => {
              if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                console.log("APP signin - "+uid);
                setUser({ currentUser: user });    //하위까지 전체 re-render 기대
                // ...
              } else {
                // User is signed out
                // ...
                console.log("APP signout....");
                setUser({ currentUser: null });   //하위까지 전체 re-render 기대
              }
          });
      },[]
  );



  let view;

  if(user.currentUser!==null){
    
    const loginstatus = (
      <section className="section">
      <div>
          <div>
              <div>{user.currentUser.email}</div>
              <button onClick={signOut}>SIGNOUT</button>
          </div>
      </div>
      </section>);


    if (viewPage==='home'){
      //https://react.vlpt.us/basic/05-props.html  여러개 넘기기
      view = <Home changePage={changePage} user={user.currentUser}></Home>
    }
    else if(viewPage == 'modify')
    {   
      view = <Modify changePage={changePage} loginstatus={loginstatus}></Modify>
    }
    else if(viewPage == 'new')
    {   
      view = <New changePage={changePage}></New>
    }
  
  }else{
    view = <Init changePage={changePage}></Init>
  }
 
  return (
    <div>
      {view}
    </div>
  );
}

export default App;
