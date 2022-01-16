const functions = require("firebase-functions");
const admin = require("firebase-admin");

//admin.initializeApp(functions.config().firebase);  // for function-firebase server
//for function-framework in local
serviceAccount = require('C:\\Users\\junlee03\\OneDrive - Arm\\Desktop\\ReactProject\\daycoinvest\\functions\\daycoinvest-dc31c6816465.json');
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  }
); 

const db = admin.firestore();
// const fetch = require("node-fetch");
// const request = require("request-promise");
const axios = require("axios");
const { resolve } = require("path");

// function display(dis)
// {
//   console.log(dis);
// }
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
async function db_access(){

//   return new Promise(async function(resolve, reject){

//       console.log("db acess .. 1");
//       let data = await db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm").get();
//       console.log("db acess .. 2");

//       if (data.exists) {
//         console.log("!Found : Document data:", data.data());
//         a_key = data.data().a_key;
//         s_key = data.data().s_key;
//       } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//       }      

//       resolve([a_key, s_key]);
//   });
// }

//   console.log("db acess .. ");

//   let data = await db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm").get();

//   if (data.exists) {
//     console.log("!Found : Document data:", data.data());
//     a_key = data.data().a_key;
//     s_key = data.data().s_key;
//   } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//   }
  
  
  await db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm")
    .get().then( (doc) => {
    if (doc.exists) {
      console.log("!Found : Document data:", doc.data());
      a_key = doc.data().a_key;
      s_key = doc.data().s_key;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })
  .catch((err) => {
    console.log("DB get Error", err);
  });  
  

  return [a_key, s_key];
 
}


function order(a_key, s_key)
{
  ///////////////////////////////////////////////////
  // let a_key="";
  // let s_key="";
  console.log("start get key ---");
  // db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm")
  //   .get().then( (doc) => {
  //   if (doc.exists) {
  //     console.log("!Found : Document data:", doc.data());
  //     a_key = doc.data().a_key;
  //     s_key = doc.data().s_key;
  //   } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //   }
  // })
  // .catch((err) => {
  //   console.log("DB get Error", err);
  // });

  // let dbget = async function(){
  //   let data = await db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm").get();
    
  //   if (doc.exists) {
  //     console.log("!Found : Document data:", doc.data());
  //     a_key = doc.data().a_key;
  //     s_key = doc.data().s_key;
  //   } else {
  //     console.log("No such document!");
  //   }
  //   console.log("1.a_key:"+a_key);
  //   console.log("2.s_key:"+s_key);
  // }
  console.log("end get key ---");
  console.log("a_key:"+a_key);
  console.log("s_key:"+s_key);
  
  //////  https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0  ///////
  const { v4: uuidv4 } = require('uuid');
  const crypto = require('crypto');
  const sign = require('jsonwebtoken').sign;
  const queryEncode = require("querystring").encode;

  const access_key = a_key;
  const secret_key = s_key;

  const body = {
      market: 'KRW-BTC',
      side: 'bid',
      volume: '1.01',
      price: '5000',
      ord_type: 'limit',
  }

  const query = queryEncode(body)

  const hash = crypto.createHash('sha512')
  const queryHash = hash.update(query, 'utf-8').digest('hex')
  
  const payload = {
      access_key: access_key,
      nonce: uuidv4(),
      query_hash: queryHash,
      query_hash_alg: 'SHA512',
  }
  
  const token = sign(payload, secret_key)

  const AuthStr = 'Bearer '.concat(token);
  const URL = "https://api.upbit.com/v1/orders";

  console.log(AuthStr);
  console.log(URL);

  const http = require('http');
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) {
      console.log("My public IP address is: " + ip);
    });
  });

  axios.post(URL, body, { 
    headers: {Authorization: AuthStr},
    })
    .then((response) => {
      console.log(response.data);
  })
  .catch((error) => {
      console.log('error ' + error);
      console.log('error ' + body);
      console.log('error ' + error.response);

      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
  });
}


exports.helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("test call", {structuredData: true});

  /// https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8-%EA%B0%80%EB%8A%A5-%EC%A0%95%EB%B3%B4 
  // const { v4: uuidv4 } = require('uuid');
  // const crypto = require('crypto')
  // const sign = require('jsonwebtoken').sign
  // const queryEncode = require("querystring").encode

  // const access_key = "1";
  // const secret_key = "1";
  
  // const body = {
  //     market: 'KRW-BTC'
  // }

  // const query = queryEncode(body)

  // const hash = crypto.createHash('sha512')
  // const queryHash = hash.update(query, 'utf-8').digest('hex')

  // const payload = {
  //     access_key: access_key,
  //     nonce: uuidv4(),
  //     query_hash: queryHash,
  //     query_hash_alg: 'SHA512',
  // }

  // const token = sign(payload, secret_key)

  
  // const AuthStr = 'Bearer '.concat(token);
  // const URL = "https://api.upbit.com/v1/orders/chance?"+ query;

  // console.log(AuthStr);
  // console.log(URL);

  // axios.get(URL, { 
  //   headers: {Authorization: AuthStr},
  //   json: body
  //   })
  //   .then((response) => {
  //     console.log(response.data);
  // })
  // .catch((error) => {
  //     console.log('error ' + error);
  // });

  // https://docs.upbit.com/reference/%EC%A0%84%EC%B2%B4-%EA%B3%84%EC%A2%8C-%EC%A1%B0%ED%9A%8C
  // const { v4: uuidv4 } = require('uuid');
  // const sign = require('jsonwebtoken').sign;

  // const access_key = "1";
  // const secret_key = "1";
  // console.log(access_key);
  // console.log(secret_key);

  // const payload = {
  //     access_key: access_key,
  //     nonce: uuidv4(),
  // };
  // const token = sign(payload, secret_key);

  // const AuthStr = 'Bearer '.concat(token);
  // const URL = "https://api.upbit.com/v1/accounts";
  // //const URL = "https://api.upbit.com/v1/market/all?isDetails=false";
  // console.log(AuthStr);
  // console.log(URL);

  // const http = require('http');
  // http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, 
  // function(resp) {
  //   resp.on('data', function(ip) {
  //     console.log("My public IP address is: " + ip);
  //   });
  // });

  // axios.get(URL, { headers: {Authorization: AuthStr} })
  // //axios.get(URL, { headers: {Accept: "application/json"} })
  // .then((response) => {
  //     console.log(response.data);
  // })
  // .catch((error) => {
  //     console.log('error ' + error);
  // });
  // ////////////////////////////////////////////////////////////////
  
  let key = await db_access();
  order(key[0], key[1]);


  response.send("test call!! --- END");
});

// exports.getTest = functions.pubsub.schedule("every 30 minutes")
//     .onRun((context) => {
//       const options = {method: "GET", headers: {Accept: "application/json"}};
//       fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
//           .then((response) => response.json())
//           .then((response) => console.log(response))
//           .catch((err) => console.error(err));
//     });

exports.scheduledFunction = functions.pubsub.schedule("58 23 * * *")
    .timeZone("Europe/London")
    .onRun((context) => {
      functions.logger.info("schedule function... start", {structuredData: true});
      //console.log("This will be run every x minutes!");

      // db.collection("invest").doc("tz7nuls2qhczJZuLSHdx").get().then((doc) => {
      //   console.log("aaaaa: "+doc.data().balance);

      //   // get all acount
      //   // ///////////////////////////////////////////////////////////////
      //   // success
      //   // const options = {method: "GET", headers:
      //   // {Accept: "application/json"}};
      //   // fetch("https://api.upbit.com/v1/market/all?isDetails=false",
      //   // options)
      //   //     .then((response) => response.json())
      //   //     .then((response) => console.log(response))
      //   //     .catch((err) => console.error(err));
      // }).catch((err) => {
      //   console.log("Error", err);
      // });

      // order();
      functions.logger.info("schedule function... end", {structuredData: true});

      return null;
    });
