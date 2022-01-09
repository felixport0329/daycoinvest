import * as functions from "firebase-functions";
//import fetch from "node-fetch";
import axios from "axios"; // npm install axios

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});

//   const options = {method: "GET", headers: {Accept: "application/json"}};
//   fetch("https://api.upbit.com/v1/market/all?isDetails=false", options)
//       .then((response) => response.json())
//       .then((response) => console.log(response))
//       .catch((err) => console.error(err));
  response.send("Junghoon - end");
});


// fail axios
// export const getAccess = functions.https.onRequest((request, response) => {
//     async () => {
//         try {
//             const result = await axios.get(
//                 "https://api.upbit.com/v1/market/all?isDetails=false",
//                 {
//                     headers: {
//                         'Accept': 'application/json',
//                     }
//                 }
//                 );
//             //const result="aa";
//             console.log(result);
//             //return 0;
//         } catch (e) {
//             functions.logger.error(e)
//             //return 0;
//         }
//     }
// });