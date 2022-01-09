const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// const fetch = require("node-fetch");
// const request = require("request-promise");
const axios = require("axios");

// function display(dis)
// {
//   console.log(dis);
// }
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("test call", {structuredData: true});

  // const uuidv4 = require("uuid/v4");
  const { v4: uuidv4 } = require('uuid');
  const sign = require('jsonwebtoken').sign;

  const access_key = "1";
  const secret_key = "1";
  console.log(access_key);
  console.log(secret_key);

  const payload = {
      access_key: access_key,
      nonce: uuidv4(),
  };
  const token = sign(payload, secret_key);

  const AuthStr = 'Bearer '.concat(token);
  const URL = "https://api.upbit.com/v1/accounts";
  //const URL = "https://api.upbit.com/v1/market/all?isDetails=false";
  console.log(AuthStr);
  console.log(URL);

  const http = require('http');
  http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ip) {
      console.log("My public IP address is: " + ip);
    });
  });

  axios.get(URL, { headers: {Authorization: AuthStr} })
  //axios.get(URL, { headers: {Accept: "application/json"} })
  .then((response) => {
      console.log(response.data);
  })
  .catch((error) => {
      console.log('error ' + error);
  });
  response.send("test call!! END");
});

// exports.getTest = functions.pubsub.schedule("every 30 minutes")
//     .onRun((context) => {
//       const options = {method: "GET", headers: {Accept: "application/json"}};
//       fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
//           .then((response) => response.json())
//           .then((response) => console.log(response))
//           .catch((err) => console.error(err));
//     });


exports.scheduledFunction = functions.pubsub.schedule("every 50 minutes")
    .onRun((context) => {
      functions.logger.info("schedule function... ", {structuredData: true});
      console.log("This will be run every x minutes!");

      db.collection("invest").doc("tz7nuls2qhczJZuLSHdx").get().then((doc) => {
        console.log("aaaaa: "+doc.data().balance);

        // get all acount


        // ///////////////////////////////////////////////////////////////
        // success
        // const options = {method: "GET", headers:
        // {Accept: "application/json"}};
        // fetch("https://api.upbit.com/v1/market/all?isDetails=false",
        // options)
        //     .then((response) => response.json())
        //     .then((response) => console.log(response))
        //     .catch((err) => console.error(err));
      }).catch((err) => {
        console.log("Error", err);
      });
      return null;
    });
