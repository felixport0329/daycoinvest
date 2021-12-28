const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello @@123 logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.scheduledFunction = functions.pubsub.schedule("every 1 minutes")
    .onRun((context) => {
      functions.logger.info("Hello @@3-123 min", {structuredData: true});
      console.log("This will be run every 1 minutes!");
      db.collection("invest").doc("tz7nuls2qhczJZuLSHdx").get().then((doc) => {
        console.log(doc.data().balance);
      }).catch((err) => {
        console.log("Error", err);
      });
      return null;
    });
