const functions = require("firebase-functions");
const admin = require("firebase-admin");

// for function-firebase server
//admin.initializeApp(functions.config().firebase);

//for function-framework in local
serviceAccount = require('C:\\Users\\junlee03\\OneDrive - Arm\\Desktop\\ReactProject\\daycoinvest\\functions\\daycoinvest-dc31c6816465.json');
admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount),
  }
); 

const db = admin.firestore();
const axios = require("axios");
const { resolve } = require("path");

// function display(dis)
// {
//   console.log(dis);
// }
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


function order(a_key, s_key, type)
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

  const body = {
      //market: 'KRW-BTC',
      market: type,
      side: 'bid',
      //volume: '1.01',
      price: '10000',
      ord_type: 'price',
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

function getCallList()
{
  //const myTimeStamp = firebase.firestore.Timestamp.fromDate(new Date('2011-04-11T18:00Z'));
  const myTimeStamp = db.Timestamp.fromDate(new Date('2011-04-11T18:00Z'));
  console.log(myTimeStamp);
  console.log(new Date('2011-04-11T18:00Z').toDateString());
  console.log("aa");
  functions.logger.info("getCallList", {structuredData: true});

}

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  functions.logger.info("test call --- Start", {structuredData: true});
  //getCallList();
  let key = await db_access();
  order(key[0], key[1], "KRW-BTC");
  order(key[0], key[1], "KRW-ETH");
  functions.logger.info("test call --- End", {structuredData: true});
  response.send("Done - onRequest");
});

// exports.getTest = functions.pubsub.schedule("every 30 minutes")
//     .onRun((context) => {
//       const options = {method: "GET", headers: {Accept: "application/json"}};
//       fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
//           .then((response) => response.json())
//           .then((response) => console.log(response))
//           .catch((err) => console.error(err));
//     });

exports.scheduledFunction = functions.pubsub.schedule("59 19 * * *")
// exports.scheduledFunction = functions.pubsub.schedule("every 1 hours")
    .timeZone("Europe/London")
    .onRun(async (context) => {
      functions.logger.info("schedule function... start", {structuredData: true});
      let key = await db_access();
      order(key[0], key[1], "KRW-BTC");
      order(key[0], key[1], "KRW-ETH");
      functions.logger.info("schedule function... end", {structuredData: true});

      return null;
    });
