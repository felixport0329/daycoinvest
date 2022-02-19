const functions = require("firebase-functions");
const admin = require("firebase-admin");

// for function-firebase server
admin.initializeApp(functions.config().firebase);

//for function-framework in local
// serviceAccount = require('C:\\Users\\junlee03\\OneDrive - Arm\\Desktop\\ReactProject\\daycoinvest\\functions\\daycoinvest-dc31c6816465.json');
// admin.initializeApp(
//   {
//     credential: admin.credential.cert(serviceAccount),
//   }
// ); 

const db = admin.firestore();
const axios = require("axios");
const { resolve } = require("path");
const { type } = require("os");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
async function db_access() {
  let a_key="";
  let s_key="";
  await db.collection("user").doc("fRRSgn6LKmaQdHSS1QJm")
    .get().then( (doc) => {
    if (doc.exists) {
      //console.log("!Found : Document data:", doc.data());
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


function order(a_key, s_key, type, price)
{
  // console.log("a_key:"+a_key);
  // console.log("s_key:"+s_key);
  //////  https://docs.upbit.com/reference/%EC%A3%BC%EB%AC%B8%ED%95%98%EA%B8%B0  ///////
  const { v4: uuidv4 } = require('uuid');
  const crypto = require('crypto');
  const sign = require('jsonwebtoken').sign;
  const queryEncode = require("querystring").encode;

  const access_key = a_key;
  const secret_key = s_key;

  //const volume  =  '1.01';  //TEST
  const volume  =  null;  //real
  //const ord_type = 'limit'; //TEST
  const ord_type = 'price'; //real

  console.log("coin_type: " + type+", price: " + price + ", volume: " +volume + ", ord_type: "+ord_type);

  const body = {
      market: type,
      side: 'bid',
      volume: volume,
      price: price,
      ord_type: ord_type,
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

async function getCallList()
{
  const doc_list = new Array();
  const standard_time = new Date();
  standard_time.setFullYear(2020,0,1);
  standard_time.setSeconds(0);
  standard_time.setMilliseconds(0);
  if(standard_time.getMinutes()!=30 || standard_time.getMinutes()!=0){
    if (standard_time.getMinutes()>30){
      standard_time.setMinutes(30);
    }else{
      standard_time.setMinutes(0);
    }
  }  // fine-tune

  //TEST
  //standard_time.setHours(18);
  //standard_time.setMinutes(0);
  console.log("get call list : s_time :"+standard_time);


  const standard_timeStamp = admin.firestore.Timestamp.fromDate(standard_time);
  functions.logger.info("start getCallList", {structuredData: true});
  
  await db.collection("invest").where("time", "==", standard_timeStamp).where("activate_status","==","Active")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            doc_list.push(doc.id);
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  
  functions.logger.info("end getCallList", {structuredData: true});
  return doc_list;

}

async function getInfoForBuying(doc_code)
{
  await db.collection("invest").doc(doc_code)
  .get().then( (doc) => {
    if (doc.exists) {
      coin_code = doc.data().coin_code;
      price = doc.data().invest_price;
    } else {
      console.log("No such document!");
    }
  })
  .catch((err) => {
    console.log("DB get Error", err);
  });

  return [coin_code, price];
}

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("test call --- Start", {structuredData: true});
  const doc_list = await getCallList();
  console.log(doc_list);
  const key = await db_access();
  doc_list.forEach(async function(doc_code,index){
    console.log(doc_code, index);
    result = await getInfoForBuying(doc_code);  //0: coin_type   1: price
    order(key[0], key[1], result[0], result[1]);
  });
  functions.logger.info("schedule function... end", {structuredData: true});
  response.send("Done - onRequest");
});

exports.scheduledFunction = functions.pubsub.schedule("0,30 * * * *")
// exports.scheduledFunction = functions.pubsub.schedule("every 1 hours")
    .timeZone("Europe/London")
    .onRun(async (context) => {
      functions.logger.info("schedule function... start", {structuredData: true});
      // let key = await db_access();
      // order(key[0], key[1], "KRW-BTC",10000);
      // order(key[0], key[1], "KRW-ETH",10000);
      const doc_list = await getCallList();
      const key = await db_access();
      doc_list.forEach(async function(doc_code, index){
        result = await getInfoForBuying(doc_code);  //0: coin_type   1: price
        order(key[0], key[1], result[0], result[1]);
      });
      functions.logger.info("schedule function... end", {structuredData: true});

      return null;
    });
