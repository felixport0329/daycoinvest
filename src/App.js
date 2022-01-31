
import React, { useState, useEffect } from 'react';
import Home from './components/home';
import Modify from './components/modify';
import New from './components/new';
import "./App.css";



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
  

   

  //const [viewPage, setViewPage] = useState('home');
  const [viewPage, setViewPage] = useState('modify');
  // 물고 들어 가서 subcomponent에서 변경 하는 함수
  const changePage = (page)=>{
    setViewPage(page);
  }

  let view;
  if (viewPage==='home'){
    view = <Home changePage={changePage}></Home>
  }
  else if(viewPage == 'modify')
  {   
    view = <Modify changePage={changePage}></Modify>
  }
  else if(viewPage == 'new')
  {   
    view = <New changePage={changePage}></New>
  }

  return (
    <div>
      {view}
    </div>
  );
}

export default App;
