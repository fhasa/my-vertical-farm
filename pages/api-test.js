import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  child,
  query,
  limitToLast,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// import {Chart} from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyADywmfNsRaT-9RnE1MXS24nS5ujfgseBg",
  authDomain: "iot-vertical-farming-40e8a.firebaseapp.com",
  databaseURL: "https://iot-vertical-farming-40e8a-default-rtdb.firebaseio.com",
  projectId: "iot-vertical-farming-40e8a",
  storageBucket: "iot-vertical-farming-40e8a.appspot.com",
  messagingSenderId: "372914315084",
  appId: "1:372914315084:web:a609be0fc0f122561979e9",
  measurementId: "G-8V3RS63HZW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
//bring last added element into web page
const recentPostsRef = query(
  ref(database, "sensor_value_history/branch1"),
  limitToLast(1)
);
onValue(recentPostsRef, (snapshot) => {
  const datan = snapshot.val();
  console.log(datan);
});

const dbRef = ref(getDatabase());
get(child(dbRef, "sensor_value_history/branch1"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let xtemp = [];
      let xhum = [];
      let xdate = [];
      let xlight = [];

      const datajson = snapshot.val();

      for (let key in datajson) {
        // console.log(key);  // logs "object1", "object2", "object3"
        xhum.push(datajson[key].air_humidity); // logs the object for each key
        xtemp.push(datajson[key].air_temperature);
        xdate.push(datajson[key].datetime);
        xlight.push(datajson[key].light_intensity);
      }

      var ctx = document.getElementById("myChart").getContext("2d");
      var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: xdate, // X-axis labels will be added dynamically
          datasets: [
            {
              label: "Air Temperature",
              backgroundColor: "rgb(255, 99, 132, .005)",
              lineTension: 0,
              borderColor: "rgb(255, 99, 132, 1)",
              pointRadius: 1,
              borderWidth: 1,
              data: xtemp,
              // Y-axis values will be added dynamically
            },
          ],
        },
        

        // Configuration options go here
        options: {

          scales: {
            yAxes: [{ ticks: { min: 0, max: 50 } }],
            xAxes: [{
              display: false  // hide the labels on the x-axis
          }],
        },
          //   scales: {
   
          // }
        },
      });

      // console.log(typeof(datajson));
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

// database.ref('sensor_value_history/branch1').limitToLast(1).on("child_added", function(snapshot) {
//   console.log(snapshot.val());
// });

// Add data to the chart when it is added to the database
// const fatref=  ref(database,'sensor_value_history/branch1', limit(1));

// onValue(fatref, function(snapshot) {
//   const dta = snapshot.val();
//   console.log(dta);

//   // chart.data.datasets[0].data.push(dta.air_temperature);
//   // console.log(dta.air_temperature);
//   // chart.update();
// });
