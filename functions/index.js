const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const fetch = require("node-fetch");
// const request = require("request-promise");
// const axios = require("axios");

// function display(dis)
// {
//   console.log(dis);
// }
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello @@123 logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.getTest = functions.pubsub.schedule("every 30 minutes")
//     .onRun((context) => {
//       const options = {method: "GET", headers: {Accept: "application/json"}};
//       fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
//           .then((response) => response.json())
//           .then((response) => console.log(response))
//           .catch((err) => console.error(err));
//     });


exports.scheduledFunction = functions.pubsub.schedule("every 1 minutes")
    .onRun((context) => {
      functions.logger.info("schedule function... ", {structuredData: true});
      console.log("This will be run every x minutes!");

      db.collection("invest").doc("tz7nuls2qhczJZuLSHdx").get().then((doc) => {
        console.log("a1"+doc.data().balance);

        // get all acount
        // const axios = require("axios");
        // const uuidv4 = require("uuid/v4");
        // const sign = require("jsonwebtoken").sign;

        // const accessKey = process.env.REACT_APP_UPBIT_OPEN_API_ACCESS_KEY;
        // const secretKey = process.env.REACT_APP_UPBIT_OPEN_API_SECRET_KEY;
        // console.log(accessKey);
        // console.log(secretKey);

        // const payload = {
        //   access_key: accessKey,
        //   nonce: uuidv4(),
        // };

        // const token = sign(payload, secretKey);
        // console.log(token);
        // const AuthStr = "Bearer ".concat(token);
        // const URL = "/v1/accounts";
        // axios.get(URL, {headers: {Authorization: AuthStr}})
        //     .then((response) => {
        //     // If request is good...
        //       console.log(response.data);
        //     })
        //     .catch((error) => {
        //       console.log("error " + error);
        //     });
        // const URL = "https://api.upbit.com/v1/market/all";
        // axios.get(URL)
        //     .then((response) => {
        //     // If request is good...
        //       console.log(response.data);
        //     })
        //     .catch((error) => {
        //       console.log("error " + error);
        //     });

        // const options = {method: "GET",
        // headers: {Accept: "application/json"}};
        // fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
        //   .then(response => response.json())
        //   .then(response => console.log(response))
        //   .catch(err => console.error(err));
        // request({
        //   url: "https://api.upbit.com/v1/market/all?isDetails=false",
        //   method: "GET",
        // }).then(function(resp) {
        //   console.log("a");
        // }).catch(function(error) {
        //   console.log("b");
        // });
        // try {
        //   const result = axios.get("https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD");
        //   if (result.data.length > 0 && result.data[0].basePrice) {
        //     return result.data[0].basePrice;
        //   } else {
        //     functions.logger.error("getUsdKrwRateFromHana: failed");
        //     return 0;
        //   }
        // } catch (e) {
        //   functions.logger.error(e);
        //   return 0;
        // }
        // ///////////////////////////////////////////////////////////////
        const options = {method: "GET", headers: {Accept: "application/json"}};
        fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
      }).catch((err) => {
        console.log("Error", err);
      });
      return null;
    });
